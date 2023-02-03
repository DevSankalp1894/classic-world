import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  
  Image,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {Link, useNavigate} from "react-router-dom"
import GoogleButton from 'react-google-button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Components/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdminData } from '../Redux/Admin/Admin.action';
import FinalNavbar from '../Components/FinalNavbar';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [googleValue, setGoogleValue]=useState("");

  const {adminData}=useSelector((store)=>store.adminManager);
  const gotoAdmin = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAdminData());
  },[])
  

 
const [value , setValue]=useState({
  email:"",
  password:"",

  isAuth:"true",
})
const [submitbutton , setSubmitbutton]=useState(false)
const navigate=useNavigate()



const handleSubmit=()=>{
  if(adminData.email===value.email && adminData.password===value.password){
   return gotoAdmin('/admin-dashboard');
  }

  else if( !value.email || !value.password ){
    toast.error(`please fill all the field `, {
      position: "top-center",
    });
        return 
  }
  //console.log(value);
  
  setSubmitbutton(true)
  signInWithEmailAndPassword(auth,value.email,value.password)
  .then(async(res)=>{
    setSubmitbutton(false);
    //console.log('setLogin',islogin);
    localStorage.setItem('USER',JSON.stringify(value));
    navigate("/")
    //console.log(res)
  })
  .catch((err)=>{
    setSubmitbutton(false)
   toast.error(`${err.message}`, {
      position: "top-center",
    });
    console.log("error-", err.message)
  })

}

const GoodleSignin=async()=>{
  signInWithPopup(auth,provider).then((data)=>{
         setGoogleValue(data.user.email)
         //console.log(data.user);
         localStorage.setItem("email",data.user.email)
         const user={
          email: data.user.email,
          name: data.user.displayName,
          password:data.user.email,
          logindetails:data.user.metadata,
          image:data.user.photoURL,
          contact:data.user.phoneNumber,
          isAuth:true
        }
        fetch("https://classic-world.onrender.com/UsersList", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
         // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
         localStorage.setItem('USER',JSON.stringify(user));
         navigate("/")


  })
  
}


  return (
    <Box>
     <FinalNavbar/>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      mt={55}
      bg={useColorModeValue("rgb(248, 230, 233)")}>
      <Stack spacing={0} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}  >
          <Heading fontSize={'2xl'} textAlign={'center'}>
            Login
          </Heading>
          
          
           <Image    src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/9/21/8fca3ae9-d245-443b-a142-8d568247794c1663700243878-offer-banner-300-600x240-code-_-MYNTRA400.jpg" w="100%" />
        </Stack>
        <Box
          // rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          
          p={8}>
          <Stack spacing={4}>
            <VStack>
              <Text fontWeight={"500"} >Easly using</Text>
              <GoogleButton onClick={GoodleSignin} />
              <Text fontWeight={"500"} >-Or using E-mail-</Text>
              
            </VStack>
            
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
               onChange={(e)=>setValue((prev)=>({...prev, email:e.target.value}))}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                 onChange={(e)=>setValue((prev)=>({...prev, password:e.target.value}))}
                 />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
           
              <Button
              disabled={submitbutton}
              onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={"#ff3f6c"}
                color={'white'}
                _hover={{
                  bg: '#ff3f6a',
                  color:"black"
                }}>
                login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text color={"gray.600"} align={'center'}>
                Have trouble logging in? <Link  style={{color:"red"}} to="/register"  >Register</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    <ToastContainer />
    </Box>
    );
  }