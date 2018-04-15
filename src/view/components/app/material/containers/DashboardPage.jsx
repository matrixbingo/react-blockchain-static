import React from 'react'
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors'
import Assessment from 'material-ui/svg-icons/action/assessment'
import Face from 'material-ui/svg-icons/action/face'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'
import InfoBox from '../components/dashboard/InfoBox'
import NewOrders from '../components/dashboard/NewOrders'
import MonthlySales from '../components/dashboard/MonthlySales'
import BrowserUsage from '../components/dashboard/BrowserUsage'
import RecentlyProducts from '../components/dashboard/RecentlyProducts'
import SimpleChartComponent from '../components/dashboard/SimpleChartComponent'
import globalStyles from '../styles'
import Data from '../data'
import _ from 'underscore'

const json = [{
    'metrics': {'DX_M_U_ZM_Confirm': 9, 'DX_M_U_Mobile': 43, 'DX_M_S_BillGenerate': 34},
    'ts': 1501577760000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 6, 'DX_M_U_Mobile': 53, 'DX_M_S_BillGenerate': 25},
    'ts': 1501577820000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 11, 'DX_M_U_Mobile': 55, 'DX_M_S_BillGenerate': 32},
    'ts': 1501577880000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 14, 'DX_M_U_Mobile': 39, 'DX_M_S_BillGenerate': 47},
    'ts': 1501577940000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 14, 'DX_M_U_Mobile': 56, 'DX_M_S_BillGenerate': 41},
    'ts': 1501578000000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 13, 'DX_M_U_Mobile': 52, 'DX_M_S_BillGenerate': 50},
    'ts': 1501578060000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 9, 'DX_M_U_Mobile': 59, 'DX_M_S_BillGenerate': 27},
    'ts': 1501578120000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 8, 'DX_M_U_Mobile': 46, 'DX_M_S_BillGenerate': 44},
    'ts': 1501578180000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 10, 'DX_M_U_Mobile': 59, 'DX_M_S_BillGenerate': 35},
    'ts': 1501578240000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 9, 'DX_M_U_Mobile': 44, 'DX_M_S_BillGenerate': 53},
    'ts': 1501578300000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 10, 'DX_M_U_Mobile': 50, 'DX_M_S_BillGenerate': 43},
    'ts': 1501578360000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 13, 'DX_M_U_Mobile': 49, 'DX_M_S_BillGenerate': 50},
    'ts': 1501578420000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 9, 'DX_M_U_Mobile': 56, 'DX_M_S_BillGenerate': 40},
    'ts': 1501578480000
}, {
    'metrics': {'DX_M_U_ZM_Confirm': 22, 'DX_M_U_Mobile': 55, 'DX_M_S_BillGenerate': 54},
    'ts': 1501578540000
}, {'metrics': {'DX_M_U_ZM_Confirm': 15, 'DX_M_U_Mobile': 48, 'DX_M_S_BillGenerate': 47}, 'ts': 1501578600000}]

//const singleData = [{'metrics':{'R_VALUE':58.0},'ts':1501638180000},{'metrics':{'R_VALUE':34.0},'ts':1501638000000},{'metrics':{'R_VALUE':36.0},'ts':1501638240000},{'metrics':{'R_VALUE':46.0},'ts':1501638480000},{'metrics':{'R_VALUE':52.0},'ts':1501638600000},{'metrics':{'R_VALUE':26.0},'ts':1501638300000},{'metrics':{'R_VALUE':72.0},'ts':1501638540000},{'metrics':{'R_VALUE':32.0},'ts':1501638060000},{'metrics':{'R_VALUE':49.0},'ts':1501638360000},{'metrics':{'R_VALUE':32.0},'ts':1501638420000},{'metrics':{'R_VALUE':64.0},'ts':1501637940000},{'metrics':{'R_VALUE':65.0},'ts':1501637820000},{'metrics':{'R_VALUE':54.0},'ts':1501637880000},{'metrics':{'R_VALUE':54.0},'ts':1501638120000},{'metrics':{'R_VALUE':26.0},'ts':1501638660000}]

const loadData = (fnresult) => {
    window.console.log('json--->',json)

    const resultData = fnresult(json)
    //window.console.log(resultData)
    const timeData = resultData[0]
    const lengendData = resultData[1]
    const seriseData = resultData[2]
    return [lengendData,timeData,seriseData]
}
const reData =
    function(result){
        let timeData = []
        let lengendData = ['认证成功', '详单生成', '芝麻认证通过数']
        let cell = []
        let bill = []
        let zmCnt = []

        _.each(result, function (value) {
            timeData.push(new Date(value.ts).toLocaleString())
            cell.push(value.metrics.DX_M_U_Mobile)
            bill.push(value.metrics.DX_M_S_BillGenerate)
            zmCnt.push(value.metrics.DX_M_U_ZM_Confirm)
        })
        let seriesData = [{name: '认证成功', type: 'line', stack: '总量', smooth:true,areaStyle: {normal: {}}, data: cell}, {
            name: '详单生成',
            type: 'line',
            stack: '总量',
            smooth:true,
            areaStyle: {normal: {}},
            data: bill
        }, {name: '芝麻认证通过数', type: 'line', stack: '总量', smooth:true, areaStyle: {normal: {}}, data: zmCnt}]
        return [lengendData,timeData,seriesData]
    }

/*
const appdata = {
    'goldeye/url001':{title: ['认证成功', '详单生成', '芝麻认证通过数'], 'fun': reData},
    'goldeye/url002':'fun002',
    'goldeye/url003':'fun002'
}
*/


/*const singleEchartData = (result) => {
     const timeData = []
     const singleValue = []
    _.each(result,function(value){
        timeData.push(new Date(value.ts).toLocaleString())
        singleValue.push(value.metrics.R_VALUE)
    })
    const seriesData = [{name: '认证成功', type: 'line', stack: '总量', smooth:true,areaStyle: {normal: {}}, data: singleValue}]
    return [["实际挚"],timeData,seriesData]
}*/

const DashboardPage = () => {
    const rs = loadData(reData, json)
    window.console.log('rs---->', rs)
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: rs[1]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: rs[0]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: rs[2]
    }

    return (
        <div>
            <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
                    <SimpleChartComponent option={option} title='邮件营销'/>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
                    <SimpleChartComponent option={option} theme='dark'/>
                </div>
            </div>


            <div className='row'>

                <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
                    <InfoBox Icon={ShoppingCart}
                             color={pink600}
                             title='Total Profit'
                             value='15120k'
                    />
                </div>


                <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
                    <InfoBox Icon={ThumbUp}
                             color={cyan600}
                             title='Likes'
                             value='4231'
                    />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
                    <InfoBox Icon={Assessment}
                             color={purple600}
                             title='Sales'
                             value='460'
                    />
                </div>

                <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
                    <InfoBox Icon={Face}
                             color={orange600}
                             title='New Members'
                             value='248'
                    />
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15'>
                    <NewOrders data={Data.dashBoardPage.newOrders}/>
                </div>

                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15'>
                    <MonthlySales data={Data.dashBoardPage.monthlySales}/>
                </div>
            </div>

            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
                    <RecentlyProducts data={Data.dashBoardPage.recentProducts}/>
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
                    <BrowserUsage data={Data.dashBoardPage.browserUsage}/>
                </div>
            </div>

        </div>
    )
}

export default DashboardPage
