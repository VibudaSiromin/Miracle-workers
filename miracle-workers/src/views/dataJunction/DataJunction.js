import Card from '../../components/Card'
import '../../views/dataJunction/DataJunction.css'

const DataJunction = () => {
    return(
        <div className="DataJunction-container">
            <div>
                <Card cardTitle="Excel" backgroundColor="linear-gradient(180deg, rgba(78, 40, 140, 0.56) 0%, #030007 100%)"></Card>
            </div>
            <div>
                <Card cardTitle="Manually" backgroundColor="linear-gradient(180deg, rgba(119, 107, 139, 0.56) 0%, #010002 100%)"></Card>
            </div>     
        </div>
    )
}

export default DataJunction;