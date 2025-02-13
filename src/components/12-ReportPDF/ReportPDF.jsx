import {
    Document,
    Font,
    Image,
    Page,
    PDFViewer,
    Text,
    View,
} from "@react-pdf/renderer";
import React from "react";
import PopRegular from "../../assets/Fonts/Poppins-Regular.ttf";
import PopBold from "../../assets/Fonts/Poppins-Bold.ttf";
import PopBoldItalic from "../../assets/Fonts/Poppins-BoldItalic.ttf";
import PopSemiboldItalic from "../../assets/Fonts/Poppins-SemiBoldItalic.ttf";
import logo from "../../assets/Logo/LOGO.png";

const ReportPDF = () => {
    Font.register({ family: "PopRegular", src: PopRegular });
    Font.register({ family: "PopBoldItalic", src: PopBoldItalic });
    Font.register({ family: "PopBold", src: PopBold });
    Font.register({ family: "PopSemiboldItalic", src: PopSemiboldItalic });


    const shipments = [
        { id: 1, date: "01.01.2025", pod: "I49758747", description: "CHENNAI", cod: 1708, weight: 0.956, totalAmount: 120 },
        { id: 2, date: "02.01.2025", pod: "I49758664", description: "TELANGANA", cod: 2597, weight: 1.514, totalAmount: 222 },
        { id: 3, date: "02.01.2025", pod: "I49758665", description: "KUMBAKONAM", cod: 999, weight: 0.528, totalAmount: 120 },
        { id: 4, date: "02.01.2025", pod: "33090110012950", description: "SALEM", cod: 4096, weight: 1.894, totalAmount: 232 },
        { id: 5, date: "02.01.2025", pod: "I49758666", description: "THANJAVUR", cod: 949, weight: 0.488, totalAmount: 85 },
        { id: 6, date: "02.01.2025", pod: "I49758668", description: "HYDERABAD", cod: 879, weight: 0.348, totalAmount: 90 },
        { id: 7, date: "02.01.2025", pod: "I49758669", description: "BHAVANI", cod: 1798, weight: 1.004, totalAmount: 155 },
        { id: 8, date: "02.01.2025", pod: "33090110023192", description: "HOSUR", cod: 2847, weight: 1.466, totalAmount: 172 },
        { id: 9, date: "02.01.2025", pod: "I49758667", description: "THENI", cod: 999, weight: 0.516, totalAmount: 120 },
        { id: 11, date: "03.01.2025", pod: "I49758672", description: "HYDERABAD", cod: 999, weight: 0.572, totalAmount: 130 },
        { id: 12, date: "03.01.2025", pod: "I49758673", description: "SALEM", cod: 2198, weight: 0.704, totalAmount: 124 },
        { id: 13, date: "03.01.2025", pod: "I49758675", description: "MADURAI", cod: 979, weight: 0.468, totalAmount: 85 },
        { id: 14, date: "03.01.2025", pod: "I49758674", description: "DINDIGUL", cod: 1049, weight: 0.534, totalAmount: 120 },
        { id: 15, date: "03.01.2025", pod: "I49758671", description: "AP", cod: 1998, weight: 0.894, totalAmount: 130 },
        { id: 16, date: "03.01.2025", pod: "I49758670", description: "COIMBATORE", cod: 999, weight: 0.494, totalAmount: 85 },
        { id: 17, date: "03.01.2025", pod: "7X102988923", description: "BANGALURU", cod: null, weight: 0.228, totalAmount: 40 },
        { id: 18, date: "04.01.2025", pod: "33090110009111", description: "CUDDALORE", cod: 1728, weight: 0.778, totalAmount: 120 },
        { id: 19, date: "04.01.2025", pod: "I49758749", description: "TRICHY", cod: 1538, weight: 0.598, totalAmount: 120 },
        { id: 20, date: "04.01.2025", pod: "I49758748", description: "KUDANKULAM", cod: 999, weight: 0.534, totalAmount: 120 },
        { id: 21, date: "04.01.2025", pod: "I49758750", description: "COIMBATORE", cod: 475, weight: 0.126, totalAmount: 85 },
        { id: 22, date: "04.01.2025", pod: "7X102988926", description: "BANGALURU", cod: null, weight: 0.898, totalAmount: 60 },
        { id: 23, date: "04.01.2025", pod: "7X102988925", description: "KARNATAKA", cod: null, weight: 1.312, totalAmount: 90 },
        { id: 24, date: "04.01.2025", pod: "7X102988924", description: "BANGALURU", cod: null, weight: 1.058, totalAmount: 90 },
        { id: 25, date: "06.01.2025", pod: "I49758713", description: "THANJAVUR", cod: 1948, weight: 0.992, totalAmount: 120 },
        { id: 26, date: "06.01.2025", pod: "I49758714", description: "CHENNAI", cod: 1099, weight: 0.914, totalAmount: 120 },
        { id: 27, date: "06.01.2025", pod: "I49758715", description: "PATANCHERUVU", cod: 2487, weight: 1.15, totalAmount: 180 },
        { id: 28, date: "06.01.2025", pod: "I49758716", description: "THOOTHUKUDI", cod: 2827, weight: 1.334, totalAmount: 172 },
        { id: 29, date: "06.01.2025", pod: "I49758717", description: "RANIPET", cod: 999, weight: 0.542, totalAmount: 120 },
        { id: 30, date: "06.01.2025", pod: "I49758718", description: "KATPADI", cod: 999, weight: 0.482, totalAmount: 85 },
        { id: 31, date: "06.01.2025", pod: "I49758719", description: "HYDERABAD", cod: 949, weight: 0.564, totalAmount: 130 },
        { id: 32, date: "06.01.2025", pod: "I49758678", description: "TRICHY", cod: 1099, weight: 0.444, totalAmount: 85 },
        { id: 33, date: "06.01.2025", pod: "33090110009030", description: "TENKASI", cod: 949, weight: 0.428, totalAmount: 85 },
        { id: 34, date: "07.01.2025", pod: "I49758723", description: "PERUNGALATHUR", cod: 949, weight: 0.446, totalAmount: 85 },
        { id: 35, date: "07.01.2025", pod: "I49758725", description: "TIRUPUR", cod: 999, weight: 0.516, totalAmount: 120 },
        { id: 36, date: "07.01.2025", pod: "I49758722", description: "THOOTHUKUDI", cod: 949, weight: 0.49, totalAmount: 85 },
        { id: 37, date: "07.01.2025", pod: "I49758726", description: "CHENNIMALAI", cod: 2198, weight: 0.878, totalAmount: 124 },
        { id: 38, date: "07.01.2025", pod: "I49758721", description: "THENI", cod: 799, weight: 0.292, totalAmount: 85 },
        { id: 39, date: "07.01.2025", pod: "I49758727", description: "CHENNAI", cod: 1129, weight: 0.444, totalAmount: 85 },
        { id: 40, date: "07.01.2025", pod: "I49758728", description: "TIRUPUR", cod: 1438, weight: 0.68, totalAmount: 120 },
        { id: 1, date: "01.01.2025", pod: "I49758747", description: "CHENNAI", cod: 1708, weight: 0.956, totalAmount: 120 },
        { id: 2, date: "02.01.2025", pod: "I49758664", description: "TELANGANA", cod: 2597, weight: 1.514, totalAmount: 222 },
        { id: 3, date: "02.01.2025", pod: "I49758665", description: "KUMBAKONAM", cod: 999, weight: 0.528, totalAmount: 120 },
        { id: 4, date: "02.01.2025", pod: "33090110012950", description: "SALEM", cod: 4096, weight: 1.894, totalAmount: 232 },
        { id: 5, date: "02.01.2025", pod: "I49758666", description: "THANJAVUR", cod: 949, weight: 0.488, totalAmount: 85 },
        { id: 6, date: "02.01.2025", pod: "I49758668", description: "HYDERABAD", cod: 879, weight: 0.348, totalAmount: 90 },
        { id: 7, date: "02.01.2025", pod: "I49758669", description: "BHAVANI", cod: 1798, weight: 1.004, totalAmount: 155 },
        { id: 8, date: "02.01.2025", pod: "33090110023192", description: "HOSUR", cod: 2847, weight: 1.466, totalAmount: 172 },
        { id: 9, date: "02.01.2025", pod: "I49758667", description: "THENI", cod: 999, weight: 0.516, totalAmount: 120 },
        { id: 11, date: "03.01.2025", pod: "I49758672", description: "HYDERABAD", cod: 999, weight: 0.572, totalAmount: 130 },
        { id: 12, date: "03.01.2025", pod: "I49758673", description: "SALEM", cod: 2198, weight: 0.704, totalAmount: 124 },
        { id: 13, date: "03.01.2025", pod: "I49758675", description: "MADURAI", cod: 979, weight: 0.468, totalAmount: 85 },
        { id: 14, date: "03.01.2025", pod: "I49758674", description: "DINDIGUL", cod: 1049, weight: 0.534, totalAmount: 120 },
        { id: 15, date: "03.01.2025", pod: "I49758671", description: "AP", cod: 1998, weight: 0.894, totalAmount: 130 },
        { id: 16, date: "03.01.2025", pod: "I49758670", description: "COIMBATORE", cod: 999, weight: 0.494, totalAmount: 85 },
        { id: 17, date: "03.01.2025", pod: "7X102988923", description: "BANGALURU", cod: null, weight: 0.228, totalAmount: 40 },
        { id: 18, date: "04.01.2025", pod: "33090110009111", description: "CUDDALORE", cod: 1728, weight: 0.778, totalAmount: 120 },
        { id: 19, date: "04.01.2025", pod: "I49758749", description: "TRICHY", cod: 1538, weight: 0.598, totalAmount: 120 },
        { id: 20, date: "04.01.2025", pod: "I49758748", description: "KUDANKULAM", cod: 999, weight: 0.534, totalAmount: 120 },
        { id: 21, date: "04.01.2025", pod: "I49758750", description: "COIMBATORE", cod: 475, weight: 0.126, totalAmount: 85 },
        { id: 22, date: "04.01.2025", pod: "7X102988926", description: "BANGALURU", cod: null, weight: 0.898, totalAmount: 60 },
        { id: 23, date: "04.01.2025", pod: "7X102988925", description: "KARNATAKA", cod: null, weight: 1.312, totalAmount: 90 },
        { id: 24, date: "04.01.2025", pod: "7X102988924", description: "BANGALURU", cod: null, weight: 1.058, totalAmount: 90 },
        { id: 25, date: "06.01.2025", pod: "I49758713", description: "THANJAVUR", cod: 1948, weight: 0.992, totalAmount: 120 },
        { id: 26, date: "06.01.2025", pod: "I49758714", description: "CHENNAI", cod: 1099, weight: 0.914, totalAmount: 120 },
        { id: 27, date: "06.01.2025", pod: "I49758715", description: "PATANCHERUVU", cod: 2487, weight: 1.15, totalAmount: 180 },
        { id: 28, date: "06.01.2025", pod: "I49758716", description: "THOOTHUKUDI", cod: 2827, weight: 1.334, totalAmount: 172 },
        { id: 29, date: "06.01.2025", pod: "I49758717", description: "RANIPET", cod: 999, weight: 0.542, totalAmount: 120 },
        { id: 30, date: "06.01.2025", pod: "I49758718", description: "KATPADI", cod: 999, weight: 0.482, totalAmount: 85 },
        { id: 31, date: "06.01.2025", pod: "I49758719", description: "HYDERABAD", cod: 949, weight: 0.564, totalAmount: 130 },
        { id: 32, date: "06.01.2025", pod: "I49758678", description: "TRICHY", cod: 1099, weight: 0.444, totalAmount: 85 },
        { id: 33, date: "06.01.2025", pod: "33090110009030", description: "TENKASI", cod: 949, weight: 0.428, totalAmount: 85 },
        { id: 34, date: "07.01.2025", pod: "I49758723", description: "PERUNGALATHUR", cod: 949, weight: 0.446, totalAmount: 85 },
        { id: 35, date: "07.01.2025", pod: "I49758725", description: "TIRUPUR", cod: 999, weight: 0.516, totalAmount: 120 },
        { id: 36, date: "07.01.2025", pod: "I49758722", description: "THOOTHUKUDI", cod: 949, weight: 0.49, totalAmount: 85 },
        { id: 37, date: "07.01.2025", pod: "I49758726", description: "CHENNIMALAI", cod: 2198, weight: 0.878, totalAmount: 124 },
        { id: 38, date: "07.01.2025", pod: "I49758721", description: "THENI", cod: 799, weight: 0.292, totalAmount: 85 },
        { id: 39, date: "07.01.2025", pod: "I49758727", description: "CHENNAI", cod: 1129, weight: 0.444, totalAmount: 85 },
        { id: 40, date: "07.01.2025", pod: "I49758728", description: "TIRUPUR", cod: 1438, weight: 0.68, totalAmount: 120 },
        { id: 1, date: "01.01.2025", pod: "I49758747", description: "CHENNAI", cod: 1708, weight: 0.956, totalAmount: 120 },
        { id: 2, date: "02.01.2025", pod: "I49758664", description: "TELANGANA", cod: 2597, weight: 1.514, totalAmount: 222 },
        { id: 3, date: "02.01.2025", pod: "I49758665", description: "KUMBAKONAM", cod: 999, weight: 0.528, totalAmount: 120 },
        { id: 4, date: "02.01.2025", pod: "33090110012950", description: "SALEM", cod: 4096, weight: 1.894, totalAmount: 232 },
        { id: 5, date: "02.01.2025", pod: "I49758666", description: "THANJAVUR", cod: 949, weight: 0.488, totalAmount: 85 },
        { id: 6, date: "02.01.2025", pod: "I49758668", description: "HYDERABAD", cod: 879, weight: 0.348, totalAmount: 90 },
        { id: 7, date: "02.01.2025", pod: "I49758669", description: "BHAVANI", cod: 1798, weight: 1.004, totalAmount: 155 },
        { id: 8, date: "02.01.2025", pod: "33090110023192", description: "HOSUR", cod: 2847, weight: 1.466, totalAmount: 172 },
        { id: 9, date: "02.01.2025", pod: "I49758667", description: "THENI", cod: 999, weight: 0.516, totalAmount: 120 },
        { id: 11, date: "03.01.2025", pod: "I49758672", description: "HYDERABAD", cod: 999, weight: 0.572, totalAmount: 130 },
        { id: 12, date: "03.01.2025", pod: "I49758673", description: "SALEM", cod: 2198, weight: 0.704, totalAmount: 124 },
        { id: 13, date: "03.01.2025", pod: "I49758675", description: "MADURAI", cod: 979, weight: 0.468, totalAmount: 85 },
        { id: 14, date: "03.01.2025", pod: "I49758674", description: "DINDIGUL", cod: 1049, weight: 0.534, totalAmount: 120 },
        { id: 15, date: "03.01.2025", pod: "I49758671", description: "AP", cod: 1998, weight: 0.894, totalAmount: 130 },
        { id: 16, date: "03.01.2025", pod: "I49758670", description: "COIMBATORE", cod: 999, weight: 0.494, totalAmount: 85 },
        { id: 17, date: "03.01.2025", pod: "7X102988923", description: "BANGALURU", cod: null, weight: 0.228, totalAmount: 40 },
        { id: 18, date: "04.01.2025", pod: "33090110009111", description: "CUDDALORE", cod: 1728, weight: 0.778, totalAmount: 120 },
        { id: 19, date: "04.01.2025", pod: "I49758749", description: "TRICHY", cod: 1538, weight: 0.598, totalAmount: 120 },
        { id: 19, date: "04.01.2025", pod: "I49758749", description: "TRICHY", cod: 1538, weight: 0.598, totalAmount: 120 },
        { id: 19, date: "04.01.2025", pod: "I49758749", description: "TRICHY", cod: 1538, weight: 0.598, totalAmount: 120 },
    ];

    let PAGE_SIZE = 21;


    const paginatedShipments = [];
    for (let i = 0; i < shipments.length; i += PAGE_SIZE) {
        paginatedShipments.push(shipments.slice(i, i + PAGE_SIZE));
        PAGE_SIZE = 26;
    }



    return (
        <div>
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <Document>
                    {
                        paginatedShipments.map((pagesData, pageIndex) => (
                            <Page size="A4">
                                <View style={{ margin: "20px" }}>




                                    <View style={{ width: "100%", borderTop: "1px solid #000", borderRight: "1px solid #000", borderLeft: "1px solid #000" }}>

                                        {
                                            pageIndex === 0 ? (<>

                                                <View style={{ width: "100%", height: "18px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row" }}>
                                                </View>

                                                <View style={{ width: "100%", display: "flex", borderBottom: "1px solid #000", flexDirection: "row" }}>
                                                    <View style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "0px", borderRight: "1px solid #000" }}>
                                                        <Image src={logo} style={{ width: "50%" }} />
                                                    </View>
                                                    <View style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "0px", borderRight: "1px solid #000", fontSize: "11px", fontFamily: "PopBold" }}>
                                                        <Text>Bill No: 448</Text>
                                                    </View>
                                                    <View style={{ width: "35%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "0px", fontSize: "11px", fontFamily: "PopBold" }}>
                                                        <Text>DATE: 23.01.2025</Text>
                                                    </View>
                                                </View>



                                                <View style={{ width: "100%", height: "90px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row" }}>
                                                    <View style={{ width: "40%", height: "90px", display: "flex", gap: "1px", justifyContent: "center", alignItems: "center", paddingBottom: "0px", borderRight: "1px solid #000", fontSize: "9px", fontFamily: "PopRegular" }}>
                                                        <Text>SRI JAYAM AGENCIES</Text>
                                                        <Text>118, Gandhiji road, Erode-638002.</Text>
                                                        <Text>Ph : +91 9443894875.</Text>
                                                        <Text>E-mail: erode_gandhijiroad.cjb@fr.dtdc.com.</Text>
                                                        <Text>GSTIN No:33CSYPS1879K1ZN.</Text>
                                                    </View>
                                                    <View style={{ width: "60%", height: "90px", display: "flex", gap: "1px", justifyContent: "center", alignItems: "start", paddingBottom: "0px", fontSize: "9px", fontFamily: "PopBold", paddingLeft: "10px" }}>
                                                        <Text>MANGAI PETTICOATS AND NIGHTIES</Text>
                                                        <Text> 112, OLD BUS STAND ROAD,</Text>
                                                        <Text>Ph : +91 9443894875.</Text>
                                                        <Text>PERUNDURAI, Erode, 638052</Text>
                                                        <Text>GST:33ABCFM5414H1ZL</Text>
                                                    </View>
                                                </View>
                                            </>
                                            ) : null
                                        }

                                        <View style={{ width: "100%", height: "30px", borderBottom: "1px solid #000", display: "flex", flexDirection: "row" }}>
                                            <View style={{ width: "8%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>S.NO</Text>
                                            </View>
                                            <View style={{ width: "13%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>DATE</Text>
                                            </View>
                                            <View style={{ width: "19%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>POD NUMBER</Text>
                                            </View>
                                            <View style={{ width: "25%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>DESCRIPTION</Text>
                                            </View>
                                            <View style={{ width: "11%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>COD</Text>
                                            </View>
                                            <View style={{ width: "11%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                <Text>WEIGHT</Text>
                                                <Text> In Kgs </Text>
                                            </View>
                                            <View style={{ width: "13%", fontFamily: "PopBold", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Text>TOTAL </Text>
                                                <Text> AMOUNT </Text>
                                            </View>
                                        </View>

                                        {
                                            pagesData.map((element, index) => (
                                                <View style={{ width: "100%", height: "30px", borderBottom: "1px solid #000", display: "flex", flexDirection: "row" }}>
                                                    <View style={{ width: "8%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.id}</Text>
                                                    </View>
                                                    <View style={{ width: "13%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.date}</Text>
                                                    </View>
                                                    <View style={{ width: "19%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.pod}</Text>
                                                    </View>
                                                    <View style={{ width: "25%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.description}</Text>
                                                    </View>
                                                    <View style={{ width: "11%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.cod ? element.cod : "-"}</Text>
                                                    </View>
                                                    <View style={{ width: "11%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid #000" }}>
                                                        <Text>{element.weight}</Text>
                                                    </View>
                                                    <View style={{ width: "13%", fontFamily: "PopRegular", fontSize: "10px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Text>{element.totalAmount}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        }


                                        {
                                            pageIndex === paginatedShipments.length - 1 && paginatedShipments[pageIndex].length < 20 ? (
                                                <>
                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row" }}>

                                                    </View>

                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>Bill Amount</Text>
                                                        </View>
                                                        <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>7777</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>SGST%9</Text>
                                                        </View>
                                                        <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>699.93</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>CGST%9</Text>
                                                        </View>
                                                        <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>699.93</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>ROUND OFF</Text>
                                                        </View>
                                                        <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>0.14</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>Total Amount</Text>
                                                        </View>
                                                        <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>9177</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: "100%", height: "80px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                                        <View style={{ width: "65%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                            <Text>Sri Jayam Agencies ,</Text>
                                                            <Text>Account no - 7634257718 ,</Text>
                                                            <Text>Bank - Indian bank , Thottani branch .</Text>
                                                            <Text>IFSC – IDIB000T137</Text>
                                                        </View>
                                                        <View style={{ width: "35%", height: "25px", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", borderBottom: "1px solid #000" }}>
                                                            <Text>FOR SRI JAYAM AGENCIES</Text>
                                                        </View>
                                                    </View>
                                                </>
                                            ) : null
                                        }
                                    </View>
                                </View>
                            </Page>
                        ))
                    }

                    {
                        paginatedShipments[paginatedShipments.length - 1].length >= 20 ? (
                            <Page size="A4">
                                <View style={{ margin: "20px" }}>
                                    <View style={{ width: "100%", borderTop: "1px solid #000", borderRight: "1px solid #000", borderLeft: "1px solid #000" }}>
                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row" }}>

                                        </View>

                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>Bill Amount</Text>
                                            </View>
                                            <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>7777</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>SGST%9</Text>
                                            </View>
                                            <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>699.93</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>CGST%9</Text>
                                            </View>
                                            <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>699.93</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>ROUND OFF</Text>
                                            </View>
                                            <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>0.14</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "100%", height: "20px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "87%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopRegular", display: 'flex', textAlign: "right", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>Total Amount</Text>
                                            </View>
                                            <View style={{ width: "13%", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>9177</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "100%", height: "80px", display: "flex", borderBottom: "1px solid #000", flexDirection: "row", }}>
                                            <View style={{ width: "65%", borderRight: "1px solid #000", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", paddingRight: "10px" }}>
                                                <Text>Sri Jayam Agencies ,</Text>
                                                <Text>Account no - 7634257718 ,</Text>
                                                <Text>Bank - Indian bank , Thottani branch .</Text>
                                                <Text>IFSC – IDIB000T137</Text>
                                            </View>
                                            <View style={{ width: "35%", height: "25px", fontSize: "10px", fontFamily: "PopBold", display: 'flex', textAlign: "center", justifyContent: "center", borderBottom: "1px solid #000" }}>
                                                <Text>FOR SRI JAYAM AGENCIES</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Page>) : null
                    }

                </Document>
            </PDFViewer>
        </div>
    );
};

export default ReportPDF;