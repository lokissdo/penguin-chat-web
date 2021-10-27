
var root=document.getElementById("main");
var notify_up;
var signupbtn;
const coverwrap=document.getElementById("con__wrap");
var formin;
var formup;
var signinbtn;
var checkbut=1;
function swapsign()
{
    checkbut=!checkbut;
    if (!checkbut) 
    {
       root.innerHTML=`<div class="main__signup">
       <p class="sign signup" align="center">Sign up</p>
       <div class="form_warning"></div>
       <form class="form1" id="form_signup">
         <input class="pass pass_up"  name="username" type="text" align="center" placeholder="Username">
         <input class="pass  pass_up" name="password" type="password" align="center" placeholder="Password">
         <input class="pass  pass_up" name="passwordagain" type="password" align="center" placeholder="Password again">
         <input class="submit submit_up" align="center" type="submit" value="Sign up" id="signup"></input>
         </form> 
         <p class="signin__signup" align="center">
           <span class="signin__signup-text">If you have already had any account</span> 
           <a class="signin__signup-button" onclick="swapsign()" >Sign in </a>
         </p>         
       </div>`
     displaysignup();
    }
    else 
    {
        root.innerHTML=`     <div class=" main__signin">
        <p class="sign" align="center">Sign in</p>
        <div class="form_warning"></div>
        <form class="form1" id="form_signin" >
          <input name="username" class="pass" type="text" align="center" placeholder="Username">
          <input name="password" class="pass" type="password" align="center" placeholder="Password">
          <input type="submit" class="submit" align="center" value="Sign in"></input>     
        </form> 
        <p class="signin__signup" align="center">
         <span class="signin__signup-text">If you haven't had any account yet</span> 
         <a  class="signin__signup-button" onclick="swapsign()">Sign up </a>
       </p>        
        `
        signin_messages();
    }
}
function clicksignup(e)
{
  
    e.preventDefault();
  if (!formup.elements[0].value || !formup.elements[1].value||!formup.elements[2].value)
      {
        formwarning.innerText="Vui lòngn nhập đủ thông tin";
        setTimeout(()=>{formwarning.innerText="";},3000);
      }
    else
    {
          if (formup.elements[1].value!=formup.elements[2].value)
             { formwarning.innerText="Mật khẩu chưa trùng khớp";
             formup.elements[2].value="";
             setTimeout(()=>{formwarning.innerText="";},3000);
             } 
          else{
              fetch('/api/signup', {
              method: 'POST',
              body: JSON.stringify({username:formup.elements[0].value,
                           password:formup.elements[1].value}),
             headers: {
          'Content-Type': 'application/json',
                     },
             })
          .then(response => response.json())
          .then(data => {
      // get the response from the server GET request
    if (data.mess==="exist"){
                       formwarning.innerText="Tài khoản đã tồn tại";
                        setTimeout(()=>{formwarning.innerText="";},3000);}
    else 
    {
           coverwrap.innerHTML=` 
           <div class="wrapper">
              <div class="notify__sign">
              <div class="header ">
                  <h1 class="mess-success">S U C C E S S !</h1>
                  <p>Đăng ký thành công</p>
              </div>
              <div class="btn btn-success" id="notify_up">Đăng nhập</div>
           </div>`
         
      notify_up=document.getElementById("notify_up");
      notify_up.onclick=()=>{
       coverwrap.innerHTML=``;
       swapsign();
          }
      }

  })
          }
    }
  
}
function displaysignup(){
  formup=document.getElementById("form_signup");
  formwarning=document.getElementsByClassName("form_warning")[0]
  signupbtn=document.getElementById("signup");
  signupbtn.addEventListener('click',clicksignup)
}

function clicksignin(e) {
    e.preventDefault();
     formwarning=document.getElementsByClassName("form_warning")[0];
     if (!formin.elements[1].value||!formin.elements[0].value) 
     {
       formwarning.innerText=" Vui lòngn nhập đủ thông tin ";
       setTimeout(()=>{formwarning.innerText="";},3000);
     }
     else 
     {
     fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({username:formin.elements[0].value,
                   password:formin.elements[1].value}),
     headers: {
  'Content-Type': 'application/json',
             },
     })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (data.mess=="Wrong username") 
    {
      formwarning.innerText=" Tài khoản không tồn tại ";
      formin.elements[0].value="";
      setTimeout(()=>{formwarning.innerText="";},3000);

    }
    else if (data.mess=="Wrong password") 
    {
      formwarning.innerText=" Sai mật khẩu rồi ";
      formin.elements[1].value="";
      setTimeout(()=>{formwarning.innerText="";},3000);
    }
    else if (data.mess=="sucess") 
    {
        var form = document.createElement("form");
        form.method = "POST";
        form.action = "";   
        document.body.appendChild(form);
        form.submit();
    }
    
  })
}
}
function signin_messages()
{
  formin=document.getElementById("form_signin");
   signinbtn=formin.elements[2];
 
  signinbtn.addEventListener("click",clicksignin);
}
signin_messages()
