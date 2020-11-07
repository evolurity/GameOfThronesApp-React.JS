import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import './button.css';


export default class App extends Component{

    state = {
        onToggle: false
    }

    onToggleRCh = ()=>{
        this.setState({
            onToggle: !this.state.onToggle
        });
    }

    render() {
    const {onToggle} = this.state;
    const content = onToggle ? null : <RandomChar/>;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {content}
                            <button className='button' onClick={this.onToggleRCh}>Toggle Random Char</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

