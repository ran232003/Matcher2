import React,{useState,useEffect} from 'react';
import { Form } from 'react-bootstrap';
const Input = (props)=>{
    const[inputObject,setInputObject]= useState({
        input:"",
        inputValid:false,
        lable:props.lable
    })
    const changeInput = (e)=>{
        const input = e.target.value;
        if(props.lable === "Name" ||props.lable ==="Last Name"){
            console.log("first if")
            if(input.trim().length >=2 && input.trim().length <20){
                setInputObject(()=>{
                    return {...inputObject,input:input,inputValid:true};
                })
                
            }else{
                setInputObject(()=>{
                return {...inputObject,input:input,inputValid:false};  
            })
        }
        }
        else if(props.lable === "Email"){
            if(input.trim().length <= 4 && input.trim().length >= 20 && input.includes("@")){
                setInputObject(()=>{
                    return {...inputObject,input:input,inputValid:true};
                })
            }else{
                setInputObject(()=>{
                return {...inputObject,input:input,inputValid:false};  
            })
        }
        }

    }
    console.log(inputObject.input)
    useEffect(()=>{
        props.handleInput(inputObject);
    },[inputObject.input])
   console.log(props.lable)
    return(
        <div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>{props.lable}</Form.Label>
    <Form.Control onChange={changeInput}/>
    <Form.Text className="text-muted" onChange={changeInput}>
      
    </Form.Text>
    </Form.Group>
        </div>
    )
    }
    

export default Input;