
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Categories(props) {
    return (
        <>
         <div className="p-1">
            <Link to={`categorie/${props.title}`} className="text-center card " style={{ textDecoration: "none" }}>
                <Card.Img variant="top" src={props.imageUrl} style={{ objectFit: 'cover' }} />
                <Card.Footer className="text-muted text-truncate">{props.title}</Card.Footer>
            </Link>
        </div>
        </>
       
    );
}

export default Categories;