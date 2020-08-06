import React,{Component} from 'react'
import Data from './../data/data.json'
export default class CSVjson extends Component{


    filterData(rawData,key,value){
        return rawData.filter(data=>data[key].substring(0,1)==value)
    }

    // filterDataOnGSTNo(rawData,key,value){
    //     return rawData.filter(data=>data[key]==value)
    // }
    getAllValuesForKey(data, key) {
        return data.map(val => val[key])
    }

    removeDuplicates(data) {
        return data.filter((a, b) => data.indexOf(a) === b)
    };

    // getAllData(B2BData,key,value){
    //     return B2BData.map(data=>this.filterDataOnGSTNo(B2BData,"GSTNO",))
    // }
    getItmDet(data){

        let res={}
        res["txval"]=data["Taxable Value"]
        res["rt"]=data["Tax"]*100
        res["iamt"]=data["IGST"]
        res["samt"]=data["SGST"]
        res["camt"]=data["CGST"]
        res["csamt"]=0
        return res

    }
    getItems(data){
        let res={}
        res["num"]=1;
        res["itm_det"]=this.getItmDet(data)
        return res
    }
    getInvData(data){
        // console.log(data)
        let res={}
        res["inum"]=data["Invoice No"]
        res["idt"]=data["Invoice Date"]
        res["val"]=data["Total"];
        res["pos"]=data["GSTNO"].substring(0,2)
        res["rchrg"]="N"
        res["inv_typ"]="R"
        res["itms"]=[this.getItems(data)]
        return res
    }
    getData(data,gstno){
        let res=[]
        let gstData=data.filter(e=>e["GSTNO"]==gstno)
        // console.log(gstD)
        gstData.map(d=>res.push(this.getInvData(d)))

        return res


    }

    render(){
        let B2B=[]
        let B2cs=[]
        let rawData=Data["SHREE MAHADEV TRADERS Sales"]
        let B2CSData=this.filterData(rawData,"GSTNO","N")
        let B2BData=this.filterData(rawData,"GSTNO","2")
        let allgstnos=this.getAllValuesForKey(B2BData,"GSTNO")
        let gstnos=this.removeDuplicates(allgstnos)
     
        gstnos.map(e=>B2B.push({"ctin":e,"inv":this.getData(rawData,e)}))
        let taxes=this.getAllValuesForKey(B2CSData,"Tax")
        let UniqueTaxes=this.removeDuplicates(taxes);
        let b=UniqueTaxes.map(e=>B2CSData.filter(d=>d["Tax"]==e))
        
        console.log(b)

        return(
            <div>
                
            </div>
        )
    }
}