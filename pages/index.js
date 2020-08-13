import React, {useState} from 'react';
import Layout from "../components/Layout";
import {connect} from 'react-redux';
import {DECREMENT_COUNTER, INCREMENT_COUNTER} from "../redux/actions/counterActions";

const IndexPage = ({props}) => {

    return (
        <Layout>
            <h2> Index </h2>
            <h3> {props.counter} </h3>
            <button onClick={() => props.incrementCounter()}> +1 </button>
            <button onClick={() => props.decrementCounter()}> -1 </button>
        </Layout>
    );
};

export async function getInitialProps({store}) {}

const mapStateToProps = state => ({
    counter: state.counter.value
});

const mapDispatchToProps = {
    incrementCounter: INCREMENT_COUNTER,
    decrementCounter: DECREMENT_COUNTER,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

