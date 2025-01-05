import Card from '../../components/Card'
import '../../views/testJunction/TestJunction.css'
import { BsKeyboardFill } from "react-icons/bs";
import { BsFiletypeJson } from "react-icons/bs";

const TestJunction = () => {
    return(
        <div className="TestJunction-container">
            <div>
                <Card cardTitle="JSON" backgroundColor="linear-gradient(180deg, rgba(78, 40, 140, 0.56) 0%, #030007 100%)" symbol={<BsFiletypeJson></BsFiletypeJson>} symbolSize={"100px"} sectionName="test"></Card>
            </div>
            <div>
                <Card cardTitle="Manually" backgroundColor="linear-gradient(180deg, rgba(119, 107, 139, 0.56) 0%, #010002 100%)" symbol={<BsKeyboardFill></BsKeyboardFill>} symbolSize={"100px"} sectionName="test"></Card>
            </div>     
        </div>
    )
}

export default TestJunction;