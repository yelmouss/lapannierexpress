
import Card from 'react-bootstrap/Card';

function Categories(props) {
    return (
        <Card className="text-center mb-3" style={{width : '100px'}}>
            <Card.Img variant="top" src={props.imageUrl} />
            <Card.Footer className="text-muted text-truncate">{props.title}</Card.Footer>
        </Card>
    );
}

export default Categories;