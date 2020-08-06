import React, { Component } from 'react'
import Data from './../data/data.json'
// import B2BData from './b2bData';
export default class CSVjson extends Component {


    filterData(rawData, key, value) {
        return rawData.filter(data => data[key].substring(0, 1) == value)
    }

    getAllValuesForKey(data, key) {
        return data.map(val => val[key])
    }

    removeDuplicates(data) {
        return data.filter((a, b) => data.indexOf(a) === b)
    };

    getItmDet(data) {
        let res = {}
        res["txval"] = data["Taxable Value"]
        res["rt"] = data["Tax"] * 100
        res["iamt"] = data["IGST"]
        res["samt"] = data["SGST"]
        res["camt"] = data["CGST"]
        res["csamt"] = 0
        return res
    }

    getItems(data) {
        let res = {}
        res["num"] = 1;
        res["itm_det"] = this.getItmDet(data)
        return res
    }

    getInvData(data) {
        let res = {}
        res["inum"] = data["Invoice No"]
        res["idt"] = data["Invoice Date"]
        res["val"] = data["Total"];
        res["pos"] = data["GSTNO"].substring(0, 2)
        res["rchrg"] = "N"
        res["inv_typ"] = "R"
        res["itms"] = [this.getItems(data)]
        return res
    }

    getData(data, gstno) {
        let res = []
        let gstData = data.filter(e => e["GSTNO"] == gstno)
        gstData.map(d => res.push(this.getInvData(d)))
        return res
    }

    getSum(data, key) {
        return data.reduce((a, b) => a + parseInt(b[key]), 0)
    }

    getStandardB2csData(B2cs, splyTy) {
        let res = {}
        if (B2cs.length > 0) {
            res["typ"] = "OE"
            res["sply_ty"] = splyTy
            res["rt"] = B2cs[0]["Tax"] * 100
            res["pos"] = B2cs[0]["GSTNO"].substring(10, 12)
            res["txval"] = this.getSum(B2cs, "Taxable Value")
            res["iamt"] = this.getSum(B2cs, "IGST")
            res["camt"] = this.getSum(B2cs, "CGST")
            res["samt"] = this.getSum(B2cs, "SGST")
            res["csamt"] = 0
            return res
        }
    }
    filterIntraData(data) {
        return data.filter(e => e["GSTNO"].substring(10, 12) == "KA")
    }
    filterInterData(data) {
        return data.filter(e => e["GSTNO"].substring(10, 12) != "KA")
    }
    render() {
        let B2B = []
        let B2cs = []
        // let nil = {}
        let finalRes = {}

        let rawData = Data["SHREE MAHADEV TRADERS Sales"]
        let B2CSData = this.filterData(rawData, "GSTNO", "N")
        let B2BData = this.filterData(rawData, "GSTNO", "2")
        // let nilData = rawData.filter(d => d["Tax"] == 0)
        let allgstnos = this.getAllValuesForKey(B2BData, "GSTNO")
        let gstnos = this.removeDuplicates(allgstnos)
        gstnos.map(e => B2B.push({ "ctin": e, "inv": this.getData(rawData, e) }))


        let taxes = this.getAllValuesForKey(B2CSData, "Tax")
        let UniqueTaxes = this.removeDuplicates(taxes);
        let taxesWiseData = UniqueTaxes.map(e => B2CSData.filter(d => d["Tax"] == e))
        let intraData = taxesWiseData.map(d => this.filterIntraData(d))
        let interData = taxesWiseData.map(d => this.filterInterData(d))

        intraData.map(d => B2cs.push(this.getStandardB2csData(d, "INTRA")))
        interData.map(d => B2cs.push(this.getStandardB2csData(d, "INTER")))
        B2cs=B2cs.filter(d=>d!=undefined)

        finalRes["gstin"] = "29BYEPD1838A1ZU"
        finalRes["fp"] = "062020"
        finalRes["hash"] = "hash"
        finalRes["version"] = "Winman GST-1088"
        finalRes["b2b"] = B2B
        finalRes["b2cs"] = B2cs
        console.log(finalRes)

        return (
            <div>

            </div>
        )
    }
}