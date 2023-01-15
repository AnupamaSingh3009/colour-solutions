import {useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "../urls";
import {Card, Container} from "react-bootstrap";
import {useParams} from "react-router";

export function Page(props) {
    const { link } = useParams()
    const [page, setPage] = useState({});
    useEffect(() => {
        getPageByName()
    }, [link])

    const getPageByName = () => {
        axios.get(URLs.GET_PAGE_BY_LINK_URL(link))
            .then(response => response.data)
            .then(page => setPage(page));
    }

    return(
        <Card>
            <Card.Header><h2>{page.title}</h2></Card.Header>
            <Card.Body dangerouslySetInnerHTML={{__html: page.content}}>
            </Card.Body>
        </Card>

    )
}