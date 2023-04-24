from joblib import dump, load
import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings("ignore")
conditionVariables = ['op_setting_1', 'op_setting_2', 'op_setting_3']
dataVariables = ['sensor_1', 'sensor_2', 'sensor_3', 'sensor_4', 'sensor_5',
                 'sensor_6', 'sensor_7', 'sensor_8', 'sensor_9', 'sensor_10',
                 'sensor_11', 'sensor_12', 'sensor_13', 'sensor_14', 'sensor_15',
                 'sensor_16', 'sensor_17', 'sensor_18', 'sensor_19', 'sensor_20',
                 'sensor_21']

sensorToFuse = ['sensor_2', 'sensor_3', 'sensor_4', 'sensor_7', 'sensor_11', 'sensor_12', 'sensor_15', 'sensor_17']

model_kmeans = load('app/files/data/model_kmeans.joblib')

weights = np.load('app/files/data/weights.npy')


def load_Normalization(data):
    list_df = []
    Clusters = data.cluster.unique()
    for cluster in Clusters:
        each_cluster = data[data.cluster == cluster].copy()
        sc_model = f'app/files/data/sc_model_{cluster}.joblib'
        sc = load(sc_model)
        each_cluster.loc[:, dataVariables] = sc.transform(each_cluster.loc[:, dataVariables])
        list_df.append(each_cluster)
    res_df = pd.concat(list_df).reset_index(drop=True)
    res_df.sort_values(by=['Unit', 'Timestep'], inplace=True)
    return res_df


def degradationSensorFusion(data, sensorToFuse, weights):
    smooth_health_indicator = pd.DataFrame(data=np.sum(data[sensorToFuse] * weights, axis=1),
                                           columns=['smooth_health_indicator'])
    smooth_health_indicator[['Unit', 'Timestep']] = data[['Unit', 'Timestep']].copy()
    units = smooth_health_indicator.Unit.unique()
    list_df = []
    for unit in units:
        each_unit = smooth_health_indicator[smooth_health_indicator.Unit == unit].copy()
        each_unit['smooth_health_indicator'] = each_unit['smooth_health_indicator'].rolling(window=21, center=True,
                                                                                            min_periods=0).mean()
        neg = each_unit['smooth_health_indicator'].values[0]
        each_unit['smooth_health_indicator'] = each_unit['smooth_health_indicator'] + 1 - neg
        list_df.append(each_unit)
    res_df = pd.concat(list_df)
    return res_df


def calc_accucary(range_predict):
    acc = range_predict[1] - max(range_predict[0], 0)
    ans_acc = 85 + (250 - acc) * 0.06
    return ans_acc



class residualSimilarityModel:
    def __init__(self):
        self.df_model = pd.DataFrame(columns=['Unit', 'lifeSpan', 'poly'], index=None)

    def fit(self, dataTrain, polynomial_deg=3):  # data train has many machines
        units = dataTrain.Unit.unique()
        for unit in units:
            each_unit = dataTrain[dataTrain.Unit == unit].copy()
            poly = np.polyfit(each_unit.Timestep, each_unit.smooth_health_indicator, polynomial_deg)  ## Poly
            self.df_model = self.df_model.append(pd.Series({
                'Unit': unit,
                'lifeSpan': each_unit.Timestep.values[-1],
                'poly': poly,
            }), ignore_index=True)

    def predictRUL(self, dataTest, NEIGHBORS_NUM=20):  # data test is a machine
        list_score = []
        for poly in self.df_model.poly:
            d_ij = np.linalg.norm(dataTest.smooth_health_indicator - np.polyval(poly, dataTest.Timestep), ord=1)
            list_score.append(d_ij)

        df_pred = self.df_model[['Unit', 'lifeSpan']].copy()
        df_pred['score'] = list_score
        df_pred.sort_values(by='score', inplace=True)
        df_pred = df_pred[:NEIGHBORS_NUM]

        estRUL = df_pred.lifeSpan.mean() - dataTest.Timestep.max()
        ciRUL = [df_pred.lifeSpan.min() - dataTest.Timestep.max(), df_pred.lifeSpan.max() - dataTest.Timestep.max()]

        return estRUL, ciRUL, df_pred


