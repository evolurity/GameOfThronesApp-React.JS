import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages";
import './button.css';
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import gotService from "../../services/gotService";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import HousesPage from "../pages/housesPage";
import BooksPage from "../pages/booksPage";
import BooksItem from "../pages/booksItem";



export default class App extends Component{
    gotService = new gotService();
    state = {
        onToggle: false,
        error: false,
        pathes: {
            main: '/',
            characters: '/characters/',
            houses: '/houses/',
            books: '/books/'
        }
    }
    checkUrl(pathname, pathes) {
        const arr = [];
        for (let key in pathes) {
            arr.push(pathes[key]);
        }
        if (!arr.includes(pathname)) {
            return(
                <>
                    <Row>

                        <span>You are lost. Back to main menu</span>

                        <button><Link to='/characters/'>Back to main menu</Link></button>
                    </Row>
                </>
            )
        }
    }




    onToggleRCh = ()=>{
        this.setState({
            onToggle: !this.state.onToggle
        });
    }
    componentDidCatch() {
        this.setState({error:true})
    }

    render() {
        if(this.state.error){
            return <ErrorMessage/>
        }
    const {onToggle} = this.state;
    const content = onToggle ? null : <RandomChar/>;
    const pathes = {...this.state.pathes};

        return (
            <Router>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {content}
                            <button className='button' onClick={this.onToggleRCh}>Toggle Random Character</button>
                        </Col>
                    </Row>

                        <Route path='/' exact render={() => <h1>Home Page</h1>}/>
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/houses' component={HousesPage}/>
                    <Route path='/books' exact component={BooksPage}/>
                    <Route path={`${pathes.books}:id`} render={ ({match}) => {
                            const {id} = match.params;
                            pathes.book = `/books/${id}`;
                            return <BooksItem bookId={id}/>}}/>
                        <Route path='' render={({location}) => {
                            return this.checkUrl(location.pathname, pathes);
                        }}/>


                </Container>
            </Router>
        );
    }
}

