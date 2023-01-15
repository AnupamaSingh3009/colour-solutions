import {Button, Card} from "react-bootstrap";
import './image-tab.css';
import {useState} from "react";
import axios from "axios";
import {URLs} from "../../urls";

export function ImageTab({photos, product, deletePhotoCallback}) {

    const [images, setImages] = useState([]);

    const selectImage = (photo) => {
        const idx = images.indexOf(photo);
        if (idx !== -1) {
            images.splice(idx, 1);
            setImages([...images]);
        } else {
            setImages([...images, photo]);
        }
    }

    const handleDeleteImages = () => {
        if(product) {
           axios.delete(URLs.DELETE_PRODUCT_IMAGE_URL(product),{
               data: images
           }).then(response => {
               selectImage([]);
               deletePhotoCallback(response.data);
           })
        }
    }

    const isSelected = (photo) => {
        return images.indexOf(photo) !== -1;
    }
    return (
        <Card>
            <Card.Header className="text-end">
                <Button variant="danger" disabled={images.length === 0} onClick={handleDeleteImages.bind(null)}>
                    Delete
                </Button>
            </Card.Header>
            <Card.Body>

                <div className="gallery">

                    {photos.map((image, idx) => {
                        return (
                            <div key={'product_photo_'+idx} className={isSelected(image.photo) ? "box active" : "box"} onClick={selectImage.bind(null, image.photo)}>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={image.fullUrl} alt={image.photo}/>
                            </div>
                        )
                    })}
                </div>
            </Card.Body>
        </Card>

    );
}