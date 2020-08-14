import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import io from "socket.io-client";
import AlertSnackbar from "../components/AlertSnackbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const IndexPage = () => {
    const [alertData, setAlertData] = useState({
        open: false,
        variant:'',
        msg:''
    });

    const [formData, setFormData] = useState({
        message: ''
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        socket.emit('msg', formData.message);
    }

    useEffect(() => {
        socket.on('doSome', data => {
            console.log(data)
        })

        socket.on("AlertaUsuario", data => {
            setAlertData({...alertData, ...data, open: true})
        });
        return () => socket.disconnect();
    }, []);

    return (
        <Layout>
            <h2> Index page test sockets </h2>
            <AlertSnackbar
                {...alertData}
                setAlertData={setAlertData}
            />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Standard"
                    name="message"
                    onChange={handleChange}
                    value={formData.message}/>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveIcon/>}
                >
                    Send
                </Button>
            </form>

        </Layout>
    );
};

export default IndexPage;

