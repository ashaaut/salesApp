import React,{Component} from 'react'
import Data from './../data/data.json'
export default class CSVjson extends Component{


    filterData(rawData,key,value){
        return rawData.filter(data=>data[key].substring(0,1)==value)
    }

    filterDataOnGSTNo(rawData,key,value){
        return rawData.filter(data=>data[key]==value)
    }
    getAllValuesForKey(data, key) {
        return data.map(val => val[key])
    }

    removeDuplicates(data) {
        return data.filter((a, b) => data.indexOf(a) === b)
    };

    getAllData(B2BData,key,value){
        return B2BData.map(data=>this.filterDataOnGSTNo(B2BData,"GSTNO",))
    }
    render(){
        let rawData=Data["SHREE MAHADEV TRADERS Sales"]
        let B2CSData=this.filterData(rawData,"GSTNO","N")
        let B2BData=this.filterData(rawData,"GSTNO","2")
        let allgstnos=this.getAllValuesForKey(B2BData,"GSTNO")
        let gstnos=this.removeDuplicates(allgstnos)
        console.log(gstnos)
        return(
            <div>
                
            </div>
        )
    }
}