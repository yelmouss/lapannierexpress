
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Categories(props) {
    return (
       
         <Link to={`categorie/${props.title}`} className="text-center mb-3 card" style={{width : '100px', textDecoration :"none"}}>
            <Card.Img variant="top" src={props.imageUrl} />
            <Card.Footer className="text-muted text-truncate">{props.title}</Card.Footer>
        </Link>
      
       
    );
}

export default Categories;