import './App.css';
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { URLDevelopment } from "./utilities/Url.js";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
// import ReactLoading from 'react-loading';

import axios from 'axios';
function App() {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [branch, setBranch] = useState('');
  const [invoiceamount, setinvoiceamount] = useState(0);
  const [receiptamount, setreceipamount] = useState(0);
  const [completedschedulesamount, setcompletedschedulesamount] = useState(0);
  const [pendingscheduleamount, setpendingschedulesamount] = useState(0);
  const [completedserviceschedulesamount, setcompletedserviceschedulesamount] = useState(0);
  const [pendingservicescheduleamount, setpendingserviceschedulesamount] = useState(0);
  const [estimatedamount, setestimatedamount] = useState(0);
  const [remainingamount, setremainingamount] = useState(0);
  const [servicecategory, setservicecategory] = useState([]);
  const [tabledata1, settabledata1] = useState([]);
  const [tabledata2, settabledata2] = useState([]);
  const [alldaydata, setalldaydata] = useState([]);
  const [tabledata3, settabledata3] = useState([]);
  const [tabledata4, settabledata4] = useState([]);
  const [tabledata5, settabledata5] = useState([]);
  const [selecttype, setselecttype] = useState('Invoices');
  const [splitup, setSplitup] = useState({});
  //const [masterservices, setMasterservices] = useState([]);
  const [mastercategories, setMastercategories] = useState([]);
  // const [getcompletedschedules, setGetcompletedschedules] = useState([]);
  // const [getpendingschedules, setGetpendingschedules] = useState([]);
  // const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [piechartdata, setPiechartdata] = useState([]);
  const [piechartCategory, setPiechartCategory] = useState([]);
  // const [showTableData2, setShowTableData2] = useState(false);
  const [firstbar, setfirstbar] = useState(true);
  // const [detailsVisible, setDetailsVisible] = useState({});
const [isLoading, setIsLoading] = useState(false);

  // console.log(tabledata3);
  // console.log(tabledata1);

  // console.log(piechartCategory);
  // console.log(piechartdata);





  //-----------------------------------------------------------------------------Current Date Data Fetching---------------------------------------------------------------- 
  useEffect(() => {
    fetchData();
    //fetchMastersevices();
    fetchMastercategories();
    console.log(selecttype);
  }, []);



  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
  //var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const { CanvasJSChart } = CanvasJSReact;


  const containerProps = {
    width: "100%",
    height: "100%",
    margin: "auto"
  };


  //---Jsx Table Decalration-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  let tableContent;


  //-----------------------------------------------------------------Branch Data Fetching----------------------------------------------------------------


  const selectBranch = [
    { id: -1, label: 'All', value: 'All' },
    { id: 1, label: 'Athulya Homecare Chennai', value: 'Athulya Homecare Chennai' },
    { id: 2, label: 'Athulya Homecare Bangalore', value: 'Athulya Homecare Bangalore' },
    { id: 3, label: 'Athulya Homecare Cochin', value: 'Athulya Homecare Cochin' },
    { id: 4, label: 'Athulya Homecare Hyderabad', value: 'Athulya Homecare Hyderabad' },
    { id: 5, label: 'Athulya Homecare Coimbatore', value: 'Athulya Homecare Coimbatore' },

  ];

  //---------------------------------------------------------------- Master Services data Fetching----------------------------------------------------------------

  // hide masterservices

  //const fetchMastersevices = async () => {
  // try {
  //const response = await fetch(`${URLDevelopment}/getmasterservices`);
  //const data = await response.json();

  //console.log(data);
  // const masterserviceOption = data.map((service) => ({
  //   value: service.service_name,
  //   label: service.service_name
  // }));
  // console.log(masterserviceOption.value);

  // setMasterservices(masterserviceOption);
  // } catch (error) {
  //   console.error("Error fetching countries:", error);
  // }
  //};

  //-------------------------------------------------------------------- Master Categories data Fetching----------------------------------------------------------------


  const fetchMastercategories = async () => {

    setMastercategories(0);
    try {

      const response = await fetch(`${URLDevelopment}/getmastercategories`);
      const data = await response.json();

      const mastercategoryOption = data.map((category) => ({
        id: category.id,
        value: category.category_name,
        label: category.category_name
      }));
      // console.log("seeema");
      //const newItem = { id: -1, value: 'All', label: 'All' ,selected: true};
      const all_Categories = mastercategoryOption;
      console.log(all_Categories);
      setMastercategories(all_Categories);

    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };


  //--------------------------------------------------------------------------- Handle Changes -----------------------------------------------------------------------

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleBranch = (branch) => {
    setBranch(branch);
  }
  const handleToDate = (date) => {
    setToDate(date);
  }

  const handleCategory = (category) => {
    setSelectedCategory(category);

  }


  //------Service Category OnClick-- ---------------------------------------------------------------------------- -------------------------------------------------------------------------------               ------------------------------------------------------------------


  const handleDataPointClick = (dataPoint) => {
    console.log(`You clicked on ${dataPoint.label} with value ${dataPoint.y}`);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    from_Date = !(fromDate) ? today : from_Date;
    to_Date = !(toDate) ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    var category = dataPoint.label;
    var select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(branch);
    console.log(category);

    console.log(from_Date);
    console.log(to_Date);
    console.log(branch);
    //from_Date='2023-09-01';
    //to_Date='2023-09-24';
    axios.post(`${URLDevelopment}/getserviceinvoicesplitup?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}&service_name=${category}`)
      .then(response => {
        //setData(response.data);
        setselecttype('Category');
        settabledata2(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });


  };

  //------ Change Indian Rupees Formatt---------------------------------------------
  const addSymbols = (e) => {
    var suffixes = ["", "K", "Lakh", "Crore"];
    var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };






  /**---- View Receipt------------------------------------------------------------------------------ */
  const viewreceipts = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    from_Date = !(fromDate) ? today : from_Date;
    to_Date = !(toDate) ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    var select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(select_branch);
    setIsLoading(true); 
    axios.post(`${URLDevelopment}/getreceipts?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`)
      .then(response => {
        //setData(response.data);
        settabledata1(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  //------------------------------------------------------- OnClick Pendingreceipts Schedules ----------------------------------------------------------------------
  const pendingreceipts = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    from_Date = !(fromDate) ? today : from_Date;
    to_Date = !(toDate) ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    var select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(select_branch);
    setIsLoading(true); 
    axios.post(`${URLDevelopment}/getpendingreceipts?from_date=${from_Date}&to_date=${to_Date}&branch_id=${select_branch}`)
      .then(response => {
        //setData(response.data);
        settabledata1(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  //------------------------------------------------ OnClick Completed Data  ----------------------------------------------------------------

  const completedschedules = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    from_Date = !(fromDate) ? today : from_Date;
    to_Date = !(toDate) ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    const select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(select_branch);

    const branchIdParam = select_branch !== undefined ? select_branch : '';
    setIsLoading(true); 
    axios.post(`${URLDevelopment}/getcompletedschedules?from_date=${from_Date}&to_date=${to_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        //setData(response.data);
        setselecttype("completedschedules")
        settabledata3(response.data.success);
        console.log(response.data.success);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }



  //--------------------------------------------------------- OnClick Pending Schedules ----------------------------------------------------------------------
  const pendingSchedules = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    from_Date = !(fromDate) ? today : from_Date;
    to_Date = !(toDate) ? today : to_Date;

    var from_Date = new Date(fromDate);
    var year = from_Date.getFullYear();
    var month = String(from_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    var day = String(from_Date.getDate()).padStart(2, "0");

    from_Date = `${year}-${month}-${day}`;

    var to_Date = new Date(toDate);
    year = to_Date.getFullYear();
    month = String(to_Date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1 and pad with zeros
    day = String(to_Date.getDate()).padStart(2, "0");

    to_Date = `${year}-${month}-${day}`;
    const select_branch = branch.id;

    console.log(from_Date);
    console.log(to_Date);
    console.log(select_branch);

    const branchIdParam = select_branch !== undefined ? select_branch : '';
    setIsLoading(true);
    axios.post(`${URLDevelopment}/getpendingschedules?from_date=${from_Date}&to_date=${to_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        //setData(response.data);
        setselecttype("pendingschedules")
        settabledata4(response.data.success);

        console.log(response.data.success);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }




  //---- Fetch Current Date and Branch Data Fetching-------------------------------------------------------------

  const fetchData = () => {

    setfirstbar(true);
    setIsLoading(true); 

    const from_Date = fromDate ? new Date(fromDate) : new Date();

    // Convert fromDate to the required format
    const fromYear = from_Date.getFullYear();
    const fromMonth = String(from_Date.getMonth() + 1).padStart(2, '0');
    const fromDay = String(from_Date.getDate()).padStart(2, '0');
    const formattedFrom_Date = `${fromYear}-${fromMonth}-${fromDay}`;

    // Get the current date if toDate is not selected
    const to_Date = toDate ? new Date(toDate) : new Date();

    // Convert toDate to the required format
    const toYear = to_Date.getFullYear();
    const toMonth = String(to_Date.getMonth() + 1).padStart(2, '0');
    const toDay = String(to_Date.getDate()).padStart(2, '0');
    const formattedTo_Date = `${toYear}-${toMonth}-${toDay}`;


    var select_branch = branch.id;
    var select_category = selectedCategory.id;

    if (!select_category) {
      console.log("Not Selected");
      setfirstbar(false);

    } else {

      const branchIdParam = select_branch !== undefined ? select_branch : '';

      console.log("Service Params:-" + formattedFrom_Date + " " + formattedTo_Date + " " + branchIdParam + " " + select_category);
      // Completed  and Pending Service Schedules
      setIsLoading(true);
      axios.post(`${URLDevelopment}/getschedulesummary?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}&category_required=${select_category}`)
        .then(response => {
 
          var completed_service_schedules = response.data.data['Completed_Schedules'];
          var pending_service_schedules = response.data.data['Pending_Schedules'];

          let rupeeIndian = Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          });
          completed_service_schedules = rupeeIndian.format(completed_service_schedules);
          pending_service_schedules = rupeeIndian.format(pending_service_schedules);

          setcompletedserviceschedulesamount(completed_service_schedules);
          setpendingserviceschedulesamount(pending_service_schedules);

          //console.log(servicecategory);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Category Schedules
       setIsLoading(true);
      axios.post(`${URLDevelopment}/getschedulecategoryrevenue?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}&category_required=${select_category}`)
        .then(response => {
          //setData(response.data);formattedTo_Date
          console.log("Category Service Schedules");
          console.log(response.data.data);
          setservicecategory(response.data.data);
          //console.log(servicecategory);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

        setIsLoading(true);
      axios.post(`${URLDevelopment}/getschedulerevenue?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}&category_required=${select_category}`)
        .then(response => {
          //setData(response.data);
          settabledata5(response.data.data);

        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    }
    //from_Date='2023-09-01';
    //to_Date='2023-09-24';
    console.log(formattedFrom_Date, formattedTo_Date, select_branch);

    const branchIdParam = select_branch !== undefined ? select_branch : '';
    setIsLoading(true)
    axios.post(`${URLDevelopment}/getinvoices?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        //setData(response.data);
        settabledata1(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    console.log(formattedFrom_Date, formattedTo_Date, select_branch);
    firstbar == false ?

      axios.post(`${URLDevelopment}/getserviceinvoice?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}`)
        .then(response => {
          //setData(response.data);formattedTo_Date
          setservicecategory(response.data.data);
          //console.log(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
      :
    setIsLoading(true);
      axios.post(`${URLDevelopment}/getschedulecategoryrevenue?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}&category_required=${select_category}`)
        .then(response => {
          //setData(response.data);formattedTo_Date
          setservicecategory(response.data.data);
          // console.log("Deepthi");
          console.log(servicecategory);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
     setIsLoading(true);
    axios.post(`${URLDevelopment}/getservicecategorybranch?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}&service_category=${select_category}`)
      .then(response => {
        setPiechartCategory(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

setIsLoading(true);
    axios.post(`${URLDevelopment}/getalldayinvoice?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        //setData(response.data);
        setalldaydata(response.data.data);
        //console.log(response.data.data);
        console.log(alldaydata);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    console.log(formattedFrom_Date, formattedTo_Date, select_branch);
    let select_branchs = branch.id;
    console.log(formattedFrom_Date, formattedTo_Date, select_branchs);
   setIsLoading(true);
    axios.post(`${URLDevelopment}/getinvoicesbranches?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        setPiechartdata(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
    axios.post(`${URLDevelopment}/getsummary?from_date=${formattedFrom_Date}&to_date=${formattedTo_Date}&branch_id=${branchIdParam}`)
      .then(response => {
        //setData(response.data);
        var invoice_amount = response.data.data['Invoice_Sum'];
        var receipt_amount = response.data.data['Receipt_Sum'];
        var completedschedules_amount = response.data.data['Completed_Schedule_Sum'];
        var remaining_amount = invoice_amount - receipt_amount;
        var estimated_sum = invoice_amount + completedschedules_amount;
        var pendingschedule_amount = response.data.data['Pending_Schedules_Sum'];
        let rupeeIndian = Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        });
        invoice_amount = rupeeIndian.format(invoice_amount);
        invoice_amount = invoice_amount.split('.')[0];
        receipt_amount = rupeeIndian.format(receipt_amount);
        receipt_amount = receipt_amount.split('.')[0];
        remaining_amount = rupeeIndian.format(remaining_amount);
        remaining_amount = remaining_amount.split('.')[0];
        completedschedules_amount = rupeeIndian.format(completedschedules_amount);
        completedschedules_amount = completedschedules_amount.split('.')[0];
        pendingschedule_amount = rupeeIndian.format(pendingschedule_amount);
        pendingschedule_amount = pendingschedule_amount.split('.')[0];
        estimated_sum = rupeeIndian.format(estimated_sum);
        estimated_sum = estimated_sum.split('.')[0];

        setinvoiceamount(invoice_amount);
        setreceipamount(receipt_amount);
        setremainingamount(remaining_amount);
        setcompletedschedulesamount(completedschedules_amount);
        setestimatedamount(estimated_sum);
        setpendingschedulesamount(pendingschedule_amount);
        //console.log(response.data.data);
        console.log(response.data.data['Invoice_Sum']);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const stock_chart_options = {
    title: {
      text: "Invoices Generated",
      fontSize: 22,
      // fontStyle: "oblique",
      fontFamily: "arial",
    },
    subtitles: [{
      text: "INR"
    }],
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    charts: [{
      axisX: {
        title: "Period",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "DD-MM-YY"
        }
      },
      axisY: {
        title: "Income",
        titleFontSize: 22, // You can adjust the font size here
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "#,###.##"
        }
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          let content = '';
          e.entries.forEach(function (entry) {
            if (entry.dataPoint.name) {
              content += entry.dataPoint.name + ": " + entry.dataPoint.label + "<br>";
              content += entry.dataPoint.name + ": " + formatCurrency(entry.dataPoint.y) + "<br>";
            } else {
              content += "Date: " + entry.dataPoint.label + "<br>";
              content += "Amount: " + formatCurrency(entry.dataPoint.y) + "<br>";
            }
          });
          return content;
        }
      },
      data: [{
        type: "splineArea",
        xValueFormatString: "DD-MM-YY",
        color: "#3576a8",
        dataPoints: alldaydata
      }],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2018-05-01")
        }
      }

    }],

  };

  function formatCurrency(value) {
    // Format the number as Indian Rupees (INR)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value).split('.')[0];
  }


  function formatDate(date) {
    // Format the date as DD-MM-YY
    return new Intl.DateTimeFormat('en-IN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }

  const category_chart_options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: (firstbar == false) ? "Invoices Created Based on Category" : "Service Revenue Based on Category",
      fontSize: 22,
      // fontStyle: "oblique",
      fontFamily: "arial",
    },
    toolTip: {
      shared: true,
      contentFormatter: function (e) {
        let content = '';
        e.entries.forEach(function (entry) {
          if (entry.dataPoint.name) {
            content += entry.dataPoint.name + ": " + entry.dataPoint.label + "<br>";
            content += entry.dataPoint.name + ": " + formatCurrency(entry.dataPoint.y) + "<br>";
          } else {
            content += "Service Type: " + entry.dataPoint.label + "<br>";
            content += "Amount: " + formatCurrency(entry.dataPoint.y) + "<br>";
          }
        });
        return content;
      }
    },
    axisX: {
      title: "Category",
      reversed: true,
    },
    axisY: {
      title: "Income",
      includeZero: true,
      labelFormatter: addSymbols
    },
    data: [{
      type: "bar",
      dataPoints: (firstbar == false) ? servicecategory : servicecategory,
      click: (e) => {
        const dataPoint = e.dataPoint;
        handleDataPointClick(dataPoint);
      }
    }],

  }


  //---- Split-up Data Fetching-------------------------------------------------------------

  const toggleDetails = async (id) => {
    try {
      const requestBody = {
        id: id,
      };
      const response = await fetch(`${URLDevelopment}/getinvoicesplitup?invoice_id=${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();

      // Update the split-up data for the specific invoice ID
      setSplitup((prevSplitup) => ({
        ...prevSplitup,
        [id]: result.success,
      }));
    } catch (error) {
      console.error("Error fetching details from the API:", error);
    }
  };

  //===================================================Cursor Style========================================================= 

  const cursorstyle = {
    cursor: 'pointer'
  };



  //--------------------------------Pie Charts Data Fetching-----------------------------------------  
  useEffect(() => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount).split('.')[0];
    };

    const dataPoints = firstbar === false
      ? piechartdata.map(item => ({
        y: item.total_amount_sum,
        label: item.branch_name,
        yValueFormatString: formatCurrency(item.total_amount_sum)
      }))
      : piechartCategory.map(item => ({
        y: item.total_amount_sum,
        label: item.branch_name,
        yValueFormatString: formatCurrency(item.total_amount_sum)
      }));
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light",
      title: {
        text: "Branch Wise Pie-Chart",
        fontSize: 20,
        fontFamily: "arial",
        fontWeight: "bold"
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          let content = '';
          e.entries.forEach(function (entry) {
            if (entry.dataPoint.name) {
              content += entry.dataPoint.name + ": " + entry.dataPoint.label + "<br>";
              content += entry.dataPoint.name + ": " + formatCurrency(entry.dataPoint.y) + "<br>";
            } else {
              content += "Branch: " + entry.dataPoint.label + "<br>";
              content += "Amount: " + formatCurrency(entry.dataPoint.y) + "<br>";
            }
          });
          return content;
        }
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {yValueFormatString}",
        startAngle: -180,
        dataPoints: dataPoints,
      }]
    };

    const chart = new CanvasJS.Chart("chartContainer", options);
    chart.render();
  }, [firstbar, piechartdata, piechartCategory]);
  // piechartdata as a dependency
  // Empty dependency array to run this effect only once


  //--------------------------------------------------------------------------------------------PIE CHART Container ---------------------------------------------------
  const chartContainerStyle = {
    position: "relative",
    width: "100%",
    height: "400px"
  };

  const [currentPage1, setCurrentPage1] = useState(1); // pagination state
  const [rowsPerPage1, setRowsPerPage1] = useState(10); // row control state
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1); // pagination state
  const [rowsPerPage2, setRowsPerPage2] = useState(10); // row control state
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [currentPage3, setCurrentPage3] = useState(1); // pagination state
  const [rowsPerPage3, setRowsPerPage3] = useState(10); // row control state
  const [selectedRows3, setSelectedRows3] = useState([]);

  //table data

  const columns1 = [
    {
      name: 'Sno',
      // selector: 'id', // Adjust this to your data structure
      cell: (row) => {
        const index = tabledata1.indexOf(row);
        return (currentPage1 - 1) * rowsPerPage1 + index + 1;
      },
      sortable: true,
      width: '70px',
    },
    {
      name: 'Branch',
      selector: 'branch_name',
      sortable: true,
      width: '270px',
    },
    {
      name: 'Patient ID',
      selector: 'patient_id',
      sortable: true,
    },
    {
      name: 'Patient Name',
      selector: 'first_name',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Invoice No',
      selector: 'invoice_no',
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: 'dates',
      sortable: true,
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      cell: (row) => (
        <span>
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          })
            .format(row.total_amount)
            .split('.')[0]}
        </span>
      ),
    },
    {
      name: 'Paid',
      selector: 'amount_paid',
      sortable: true,
      cell: (row) => (
        <span>
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          })
            .format(row.amount_paid)
            .split('.')[0]}
        </span>
      ),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: (row) => (
        <span
          className={`${row.status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.status === 'Paid'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                : 'text-black' // Default color for other statuses
            }`}
        >
          {row.status}
        </span>
      ),
    },

  ];
  const assignedTasksColumn = {
    name: 'Assigned Tasks',
    selector: 'assignedTasks',
    sortable: true,
    width: '470px',
    cell: (row) => {
      const assignedTasksArray = JSON.parse(row.assigned_tasks);
      const assignedTasks = assignedTasksArray.map((task) => task.task).join(', ');
      return <span>{assignedTasks}</span>;
    },
  };

  const columns2 = [
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,

    },
    {
      name: 'Branch',
      selector: 'branch_name',
      sortable: true,
      width: '230px',
    },
    {
      name: 'Service Name',
      selector: 'service_name',
      sortable: true,
      width: '270px',
    },
    {
      name: 'Schedule Date',
      selector: 'schedule_date',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Membership Type',
      selector: 'membership_type',
      sortable: true,
      width: '150px',
    },
    assignedTasksColumn,
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      cell: (row) => (
        <span>
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          })
            .format(row.amount)
            .split('.')[0]}
        </span>
      ),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: (row) => (
        <span
          className={`${row.status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.status === 'Completed'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                : 'text-black' // Default color for other statuses
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];
  const assignedTasksColumn1 = {
    name: 'Assigned Tasks',
    selector: 'assignedTasks',
    sortable: true,
    width: '470px',
    cell: (row) => {
      const assignedTasksArray = JSON.parse(row.assigned_tasks);
      const assignedTasks = assignedTasksArray.map((task) => task.task).join(', ');
      return <span>{assignedTasks}</span>;
    },
  };

  const columns3 = [
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
    },
    {
      name: 'Branch',
      selector: 'branch_name',
      sortable: true,
      width: '230px',
    },
    {
      name: 'Service Name',
      selector: 'service_name',
      sortable: true,
      width: '270px',
    },
    {
      name: 'Schedule Date',
      selector: 'schedule_date',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Membership Type',
      selector: 'membership_type',
      sortable: true,
      width: '150px',
    },
    assignedTasksColumn1,
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      cell: (row) => (
        <span>
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          })
            .format(row.amount)
            .split('.')[0]}
        </span>
      ),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: (row) => (
        <span
          className={`${row.status === 'Pending'
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              : row.status === 'Paid'
                ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                : 'text-black' // Default color for other statuses
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#ffff',
        backgroundColor: '#003f5c'
      },
    },

    rows: {
      style: {
        color: "STRIPEDCOLOR",
        backgroundColor: "#839B97"
      },
      stripedStyle: {
        color: "NORMALCOLOR",
        backgroundColor: "#CFD3CE"
      }
    }
  }

  // export button handling

  const handleExportSelected1 = () => {
    const selectedDataToExport1 = selectedRows1.map((row, index) => ({
      Sno: index + 1,
      Branch: row.branch_name,
      'Patient ID': row.patient_id,
      'Patient Name': row.first_name,
      'Invoice No': row.invoice_no,
      'Invoice Date': row.dates,
      Amount: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      })
        .format(row.total_amount)
        .split('.')[0],
      Paid: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      })
        .format(row.amount_paid)
        .split('.')[0],
      Status: row.status,
    }));

    selectedDataToExport1.sort((a, b) => a.Sno - b.Sno);

    return (
      <CSVLink
        data={selectedDataToExport1}
        filename="table_value.csv"
        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };
  // export button handling

  const handleExportSelected2 = () => {
    const selectedDataToExport2 = selectedRows2.map((row) => {
      const assignedTasksArray = JSON.parse(row.assigned_tasks);
      const assignedTasks = assignedTasksArray.map((task) => task.task).join(', ');

      return {
        'Patient Name': row.first_name,
        Branch: row.branch_name,
        'Service Name': row.service_name,
        'Schedule Date': row.schedule_date,
        'Membership Type': row.membership_type,
        'Assigned Tasks': assignedTasks,
        Amount: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(row.amount).split('.')[0],
        Status: row.status,
      };
    });

    return (
      <CSVLink
        data={selectedDataToExport2}
        filename="table_value.csv"
        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };

  // export button handling

  const handleExportSelected3 = () => {
    const selectedDataToExport3 = selectedRows3.map((row) => {
      const assignedTasksArray = JSON.parse(row.assigned_tasks);
      const assignedTasks = assignedTasksArray.map((task) => task.task).join(', ');

      return {
        'Patient Name': row.first_name,
        Branch: row.branch_name,
        'Service Name': row.service_name,
        'Schedule Date': row.schedule_date,
        'Membership Type': row.membership_type,
        'Assigned Tasks': assignedTasks,
        Amount: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(row.amount).split('.')[0],
        Status: row.status,
      };
    });

    return (
      <CSVLink
        data={selectedDataToExport3}
        filename="table_value.csv"
        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#339966] before:top-1/2 before:left-1/2 before:h-2 before:w-9 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-sm  before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      >
        <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
          Export Selected as CSV
        </span>
      </CSVLink>
    );
  };


  //------ If Data  False, then Table is Displayed without service Data --------------------------------------------   
  if (firstbar == false) {

    //-----Onclick to fetch Invoices Data---------------------------------------------------    
    if (selecttype === 'Invoices') {

      tableContent = (
        isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (
        <DataTable
          columns={columns1}
          data={tabledata1}
          pagination
          paginationPerPage={rowsPerPage1}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100, 250, 500]}
          paginationTotalRows={tabledata1.length}
          selectableRows
          onSelectedRowsChange={(selectedRows) => {
            setSelectedRows1(selectedRows.selectedRows);
          }}
          onTableUpdate={({ page, rowsPerPage }) => {
            setCurrentPage1(page);
            setRowsPerPage1(rowsPerPage);
          }}
          striped
          customStyles={tableCustomStyles}
          expandableRows
          expandOnRowClicked
          onRowExpandToggled={({ data }) => {
            // Use map to loop through tabledata1 and call toggleDetails for each item
            tabledata1.forEach((item) => {
              toggleDetails(item.id);
            });
          }}
          expandableRowsComponent={({ data }) => (
            <div >

                <div>
                  <div className="grid grid-cols-5 gap-3 p-2 border-b border-gray-100 bg-[#5383a1]">
                    <div className="col-span-1 bg-[#5383a1] text-center font-semibold text-white">Sno</div>
                    <div className="col-span-1 bg-[#5383a1] text-center font-semibold text-white">Branch Name</div>
                    <div className="col-span-1 bg-[#5383a1] text-center font-semibold text-white">Schedule Date</div>
                    <div className="col-span-1 bg-[#5383a1] text-center font-semibold text-white">Service Name</div>
                    <div className="col-span-1 bg-[#5383a1] text-center font-semibold text-white">Amount</div>
                  </div>
                  {splitup[data.id] &&
                    splitup[data.id].map((item, index) => {
                      // Calculate the formatted date here
                      const inputDate = new Date(item.schedule_date);
                      const formattedDate = `${inputDate.getFullYear()}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;

                      return (
                        <div className="grid grid-cols-5 gap-3 p-2 border-b border-gray-100" key={index}>
                          <div className="col-span-1 font-normal text-center text-black ">{index + 1}</div>
                          <div className="col-span-1 font-normal text-center text-black ">{item.branch_name}</div>
                          <div className="col-span-1 font-normal text-center text-black ">{formattedDate}</div>
                          <div className="col-span-1 font-normal text-center text-black ">{item.service_name}</div>
                          <div className="col-span-1 font-normal text-center text-black ">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount).split('.')[0]}
                          </div>
                        </div>
                      );
                    })}
                </div>
            </div>
          )}
        />
        )
      );
      //----- Onclick to fetch Completed Data-------------------------------------------------------------
    } else if (selecttype === 'completedschedules') {
      tableContent = (
        isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (
        <DataTable
          columns={columns2}
          data={tabledata3}
          pagination
          paginationPerPage={rowsPerPage2}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100, 250, 500]}
          paginationTotalRows={tabledata3.length}
          selectableRows
          onSelectedRowsChange={(selectedRows) => {
            setSelectedRows2(selectedRows.selectedRows);
          }}
          onTableUpdate={({ page, rowsPerPage }) => {
            setCurrentPage2(page);
            setRowsPerPage2(rowsPerPage);
          }}
          striped
          customStyles={tableCustomStyles}
        />
        )
      );
    }
    //----- Onclick to fetch Pending Data-------------------------------------------------------------
    else if (selecttype === 'pendingschedules') {
      tableContent = (
        isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (
        <DataTable
          columns={columns3}
          data={tabledata4}
          pagination
          paginationPerPage={rowsPerPage3}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100, 250, 500]}
          paginationTotalRows={tabledata4.length}
          selectableRows
          onSelectedRowsChange={(selectedRows) => {
            setSelectedRows3(selectedRows.selectedRows);
          }}
          onTableUpdate={({ page, rowsPerPage }) => {
            setCurrentPage3(page);
            setRowsPerPage3(rowsPerPage);
          }}
          striped
          customStyles={tableCustomStyles}
        />
        )
      );
    }


    else if (selecttype === 'getreceipts') {
      tableContent = (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase    border-b border-gray-100 bg-[#003f5c] ">
            <tr className=''>
              <th scope="col" className="px-6 py-3 font-semibold">
                First Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Branch
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Service Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Schedule Date
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Membership Type
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Assigned Task
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Amount
              </th>

              <th scope="col" className="px-6 py-3 font-semibold">
                Status
              </th>


            </tr>
          </thead>
          {/* Render Table 3 JSX */}
          {tabledata4.map((item, index) => {
            const assignedTasksArray1 = JSON.parse(item.assigned_tasks);
            const assignedTasks1 = assignedTasksArray1.map((task) => task.task).join(', ');


            return (
              <tr className='bg-white border-b border-gray-100 even:bg-[#839B97]/50 odd:bg-[#CFD3CE]/50' key={index}>

                <td className="px-6 py-4 text-black whitespace-nowrap">{item.first_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.branch_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.service_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.schedule_date}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.membership_type}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{assignedTasks1}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount).split('.')[0]}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.status}</td>
              </tr>
            );
          })}
        </table>
      );
    }
    else {
      tableContent = (
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-white uppercase border-b border-gray-100 bg-[#053B50] ">
            <tr className='border-b border-gray-100 '>
              <th scope="col" className="px-6 py-3 font-semibold">
                Sno
              </th>
              <th scope="col" className="px-6 py-3 font-semibold ">
                Branch
              </th>
              <th scope="col" className="px-6 py-3 font-semibold ">
                Patient ID
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Patient Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Service Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Invoice No
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Service Date
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">
                Amount
              </th>


            </tr>
          </thead>
          <tbody>

            {tabledata2.map((item, index) => (
              <React.Fragment key={index}>
                <tr className=' border-b border-gray-100 even:bg-[#EEEEEE] odd:bg-[#64CCC5]'>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.branch_name}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.patient_id}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.patient_name}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.service_name}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.invoice_no}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{item.service_date}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount).split('.')[0]}</td>
                </tr>
              </React.Fragment>
            ))}


          </tbody>
        </table>
      );
    }

  } else {

    tableContent = (
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-white uppercase    border-b border-gray-100 bg-[#003f5c] ">
          <tr className=''>
            <th scope="col" className="px-6 py-3 font-semibold">
              Sno
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              First Name
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Branch Name
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Schedule Date
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Service Name
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Amount
            </th>

          </tr>
        </thead>
        <tbody>

          {tabledata5.map((item, index) => (
            <React.Fragment key={index}>
              <tr className='bg-white border-b border-gray-100 even:bg-[#839B97]/50 odd:bg-[#CFD3CE]/50'>
                <td className="px-6 py-4 text-black whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.full_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.branch_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.schedule_date}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.category_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{item.service_name}</td>
                <td className="px-6 py-4 text-black whitespace-nowrap">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount).split('.')[0]}</td>

              </tr>
            </React.Fragment>
          ))}


        </tbody>
      </table>
    );

  }


  return (
    <div className="App">
      <div className="mx-auto container-fluid">

        {/* Replace border-2  with border-1 border-white-500  */}

        {/*    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
          <div class="fixed flex flex-col top-0 left-0 w-64 bg-[#12486B] h-full shadow-lg">

            <div class="overflow-y-auto overflow-x-hidden flex-grow">
              <ul class="flex flex-col py-6 space-y-1">
                <li class="px-5">
                  <div class="flex flex-row items-center h-8">
                    <div class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Dashboard</div>
                  </div>
                </li>
                <li>
                  <div class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Home</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        */}




        <div className='col-span-7 grid grid-cols-7  bg-[#F3F4F6] border-solid border-2  '>
          <header className="col-span-7 h-16 bg-[#F3F4F6] border-solid border-2  ">

            <div className="container flex justify-between h-16 mx-auto">
              <img
                className="w-5/12 bg-white rounded-md xl:w-1/12 2xl:h-5/6 desktop:w-1/12 md:w-2/12 lg:w-2/12"
                src="https://www.athulyahomecare.com/lp/ophthalmology/Assest/logo.png"
                alt="logo"
              />

              <button className="p-4 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </header>


          {/* Replace border-2  with border-0 border-white-500  */}
          <main className="col-span-7 md:col-span-7  p-10 bg-[#F3F4F6] border-0 border-white-500">
            {/* Filters */}
            <div className="grid gap-5 mb-16 lg:grid-cols-5 ">
              <div className="h-10 rounded shadow-sm ">
                <Select
                  options={selectBranch}
                  name="branch_name"
                  className="branch_name"
                  placeholder="Select Branch"
                  onChange={handleBranch}

                />

              </div>

              <div className="w-full h-10 rounded shadow-sm ">
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDate}
                  className="w-full px-2 border border-gray-300 rounded-md outline-none h-9"
                  placeholderText="From Date"
                />

              </div>
              <div className="h-10 rounded shadow-sm ">
                <DatePicker
                  selected={toDate}
                  onChange={handleToDate}
                  className="w-full px-2 border border-gray-300 rounded-md outline-none h-9"
                  placeholderText="To Date"
                />
              </div>

              <div className='h-10 rounded shadow-sm'>


                {/* <Select
                  options={masterservices}
                  name="masterservices"
                  className="h-10 rounded shadow-sm"
                  placeholder="Select services"
                // onChange={handleMasterChange}
                /> */}

                <Select
                  options={mastercategories}
                  name="mastercategories"
                  className="h-10 rounded shadow-sm"
                  placeholder="Select services"
                  onChange={handleCategory}

                />

              </div>

              <div className="h-10 rounded shadow-sm ">
                <button className=" hover:bg-[#003f5c] text-white font-semibold hover:text-white h-full w-full bg-[#3d708f] border  hover:border-transparent rounded" onClick={fetchData}>
                  Filter
                </button>
              </div>
            </div>


            <div>
              <div className="flex flex-wrap">

                {!firstbar && (

                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-green-600/80 bg-gradient-to-b from-green-50 to-green-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-green-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2" /></g></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                          <h2 className="font-bold text-gray-600 uppercase">Invoices</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (invoiceamount)} <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
                        </div>
                      </div>
                    </div>

                  </div>

                )}

                {!firstbar && (
                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-pink-500/80 bg-gradient-to-b from-pink-50 to-pink-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-pink-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffff" d="M3 5.25A2.25 2.25 0 0 1 5.25 3h9.5A2.25 2.25 0 0 1 17 5.25V14h4v3.75A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V5.25ZM17 19.5h.75a1.75 1.75 0 0 0 1.75-1.75V15.5H17v4ZM6.5 7.75c0 .414.336.75.75.75h5.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0-.75.75ZM7.25 11a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm-.75 4.75c0 .414.336.75.75.75h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0-.75.75Z" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                          <h2 style={cursorstyle} onClick={viewreceipts} className="font-bold text-gray-600 uppercase">Receipts</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (receiptamount)}<span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
                {!firstbar && (
                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-yellow-600/80 bg-gradient-to-b from-yellow-50 to-yellow-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-yellow-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="#ffff" fillRule="evenodd" d="M4.93 1.31a41.401 41.401 0 0 1 10.14 0A2.213 2.213 0 0 1 17 3.517V18.25a.75.75 0 0 1-1.075.676l-2.8-1.344l-2.8 1.344a.75.75 0 0 1-.65 0l-2.8-1.344l-2.8 1.344A.75.75 0 0 1 3 18.25V3.517c0-1.103.806-2.068 1.93-2.207Zm4.822 4.997a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 0 0 1.004-1.114L8.704 8.75h1.921a1.875 1.875 0 0 1 0 3.75a.75.75 0 0 0 0 1.5a3.375 3.375 0 1 0 0-6.75h-1.92l1.047-.943Z" clipRule="evenodd" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                          <h2 style={cursorstyle} onClick={pendingreceipts} className="font-bold text-gray-600 uppercase">Remaining</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (remainingamount)} <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {!firstbar && (
                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-blue-500/80 bg-gradient-to-b from-blue-50 to-blue-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-blue-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffff" d="M13.26 20.74L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5L3 22V2l1.5 1.5L6 2l1.5 1.5L9 2l1.5 1.5L12 2l1.5 1.5L15 2l1.5 1.5L18 2l1.5 1.5L21 2v11.35c-.63-.22-1.3-.35-2-.35V5H5v14h8c0 .57.1 1.22.26 1.74M6 15v2h7.35c.26-.75.65-1.42 1.19-2H6m0-2h12v-2H6v2m0-4h12V7H6v2m17 8.23l-1.16-1.41l-3.59 3.59l-1.59-1.59L15.5 19l2.75 3" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">

                          <h2 style={cursorstyle} onClick={completedschedules} className="font-bold text-gray-600 uppercase">Completed Schedules</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (completedschedulesamount)}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Service Completed Schedules */}

                {firstbar && (
                  <div className="w-full p-6 md:w-1/2 xl:w-1/2">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-blue-500/80 bg-gradient-to-b from-blue-50 to-blue-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-blue-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffff" d="M13.26 20.74L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5L3 22V2l1.5 1.5L6 2l1.5 1.5L9 2l1.5 1.5L12 2l1.5 1.5L15 2l1.5 1.5L18 2l1.5 1.5L21 2v11.35c-.63-.22-1.3-.35-2-.35V5H5v14h8c0 .57.1 1.22.26 1.74M6 15v2h7.35c.26-.75.65-1.42 1.19-2H6m0-2h12v-2H6v2m0-4h12V7H6v2m17 8.23l-1.16-1.41l-3.59 3.59l-1.59-1.59L15.5 19l2.75 3" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">

                          <h2 style={cursorstyle} onClick={completedschedules} className="font-bold text-gray-600 uppercase">Completed Schedules</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (completedserviceschedulesamount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Pending Schedules */}
                {firstbar && (

                  <div className="w-full p-6 md:w-1/2 xl:w-1/2">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-red-500/80 bg-gradient-to-b from-red-50 to-red-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-red-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffff" d="M17 22q-2.075 0-3.538-1.463T12 17q0-2.075 1.463-3.538T17 12q2.075 0 3.538 1.463T22 17q0 2.075-1.463 3.538T17 22Zm.5-5.2v-2.3q0-.2-.15-.35T17 14q-.2 0-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15q.15-.15.15-.35t-.15-.35L17.5 16.8ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v6.25q-.45-.325-.95-.55T19 10.3V5h-2v2q0 .425-.288.713T16 8H8q-.425 0-.713-.288T7 7V5H5v14h5.3q.175.55.4 1.05t.55.95H5Zm7-16q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center" >
                          <h2 className="font-bold text-gray-600 uppercase" style={cursorstyle} onClick={completedschedules}>Pending Schedules</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (pendingservicescheduleamount)} <span className="text-red-500"><i className="fas fa-caret-up"></i></span></p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {!firstbar && (

                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-indigo-500/80 bg-gradient-to-b from-indigo-50 to-indigo-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-indigo-500/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M4 2v20l2-1l2 1l2-1l2 1l2-1l2 1l2-1l2 1V2l-2 1l-2-1l-2 1l-2-1l-2 1l-2-1l-2 1l-2-1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8m4 1V7" /></g></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                          <h2 style={cursorstyle} onClick={viewreceipts} className="font-bold text-gray-600 uppercase">Invoices+Completed Schedules</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (estimatedamount)}</p>
                        </div>
                      </div>
                    </div>

                  </div>

                )}

                {!firstbar && (
                  <div className="w-full p-6 md:w-1/2 xl:w-1/3">

                    <div className="p-5 border-b-4 rounded-lg shadow-xl border-red-500/80 bg-gradient-to-b from-red-50 to-red-100">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                          <div className="p-5 rounded-full bg-red-600/80"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffff" d="M17 22q-2.075 0-3.538-1.463T12 17q0-2.075 1.463-3.538T17 12q2.075 0 3.538 1.463T22 17q0 2.075-1.463 3.538T17 22Zm.5-5.2v-2.3q0-.2-.15-.35T17 14q-.2 0-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15q.15-.15.15-.35t-.15-.35L17.5 16.8ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v6.25q-.45-.325-.95-.55T19 10.3V5h-2v2q0 .425-.288.713T16 8H8q-.425 0-.713-.288T7 7V5H5v14h5.3q.175.55.4 1.05t.55.95H5Zm7-16q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z" /></svg></div>
                        </div>
                        <div className="flex-1 text-right md:text-center" >
                          <h2 className="font-bold text-gray-600 uppercase" style={cursorstyle} onClick={pendingSchedules}>Pending Schedules</h2>
                          <p className="text-3xl font-bold">{isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (pendingscheduleamount)} <span className="text-red-500"><i className="fas fa-caret-up"></i></span></p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {!firstbar && (

              <div className="grid shadow-sm col-2 h-96 ">
                <div className="relative overflow-x-auto bg-white border-2 border-solid rounded shadow-md sm:rounded-lg">
                  {isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (<CanvasJSStockChart containerProps={containerProps} options={stock_chart_options} />)}
                </div>

              </div>
            )}

            <br></br>
            <div className="grid grid-cols-1 shadow-sm container-fluid lg:grid-cols-2">
              <div className="relative overflow-x-auto text-xl font-semibold rounded-lg shadow-md sm:rounded-lg">

                {isLoading ? (
          // Step 2: Conditional rendering for the loading animation
          <div>Loading...</div>
        ) : (<CanvasJSChart options={category_chart_options} />)}

              </div>
              <div style={chartContainerStyle} className='text-xl font-semibold'>
                <div id="chartContainer">
                  {/* The chart will be rendered inside this div */}
                </div>
              </div>

            </div>

            <br></br>
            {/* List of Data */}
            <div className="grid  shadow-sm col-1 ">
              <div className='w-50 m-5'>{selectedRows1.length > 0 && handleExportSelected1() || selectedRows2.length > 0 && handleExportSelected2() || selectedRows3.length > 0 && handleExportSelected3()}</div>
              {/* <div className="relative overflow-x-auto rounded shadow-md sm:rounded-lg "> */}
              <div className="rounded shadow-md sm:rounded-lg ">
                {tableContent}
              </div>
            </div>
          </main>
          <footer className="col-span-7 p-2 bg-white border-2 ">
            <div className="">
              <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
                <p className="text-sm text-center text-black sm:text-left">Copyright © {(new Date().getFullYear())} All rights reserved

                </p>
                <span className="inline-flex justify-center mt-2 text-black sm:ml-auto sm:mt-0 sm:justify-start">
                  Athulya Senior Care
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
