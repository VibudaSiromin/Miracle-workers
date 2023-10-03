import Card from '../../components/Card'
import '../../views/dataJunction/DataJunction.css'
import { BsKeyboardFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import Alert from '../../components/Alert';

const DataJunction = () => {
    return(
        <>
        <Alert/>
        <div className="DataJunction-container">
            <div>
                <Card cardTitle="Excel" backgroundColor="linear-gradient(180deg, rgba(78, 40, 140, 0.56) 0%, #030007 100%)" symbol={<SiMicrosoftexcel></SiMicrosoftexcel>} symbolSize={"100px"} sectionName="data"></Card>
            </div>
            <div>
                <Card cardTitle="Manually" backgroundColor="linear-gradient(180deg, rgba(119, 107, 139, 0.56) 0%, #010002 100%)" symbol={<BsKeyboardFill></BsKeyboardFill>} symbolSize={"100px"} sectionName="data"></Card>
            </div>     
        </div>
        </>
    )
}

export default DataJunction;