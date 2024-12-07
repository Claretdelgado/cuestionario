import axios from "axios";
import { useState } from "react";
import { Card, CardBody, CardTitle, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const[data, setData] = useState ({});
    const navigate = useNavigate()
    const onChange = (e)=>{
        e.preventDefault()
        const dataTempo = data;
        dataTempo[e.target.name] = e.target.value;
        setData(dataTempo)
    } 

    const onSubmit = async ()=>{
        try{
            const res= await axios.post("http://localhost:4000/login", data);
            if(res.data.user.rol == "administrador"){
                navigate("/home")
            }else{
            navigate("/")
            }

        } catch (error){
            console.log(error)
            alert("hubo error al iniciar sesion")
        }
    }

    return(
        <Container>
            <Card style={{
                width:"25rem",
                margin:"auto"
            }}
            className="text-center mt-3"
            >
                <CardBody>
                    <CardTitle>
                        <Form>
                            <Form.Group className="mb-3">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control onChange={onChange} name="email" placeholder="ingresa tu correo"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Contreseña:</Form.Label>
                            <Form.Control  onChange={onChange} type="password" name ="password"placeholder="ingresa tu contraseña"/>
                            </Form.Group> 
                        </Form>
                        <button onClick={()=>onSubmit()}> enviar</button>
                    </CardTitle>
                </CardBody>
            </Card>
        </Container>
    )
}