		function handleProvider() 
		{

			var provider = document.getElementById('provider').value;
    		var state = document.getElementById('state').value;
    		var number = document.getElementById('number').value;

    		var img = document.createElement('img');

			if(provider > 621 || provider < 799)
			{
				img.setAttribute('src', "file:///home/madhavsingh/Pixel6/jio.jpeg");
				document.getElementById('providerInfo').appendChild('img');
				return true;
			}	
			else if(provider > 801 || provider < 920 )	
			{
				alert("Provider is Idea");
				img.src = "file:///home/madhavsingh/Pixel6/idea.jpeg";
				document.getElementById('providerInfo').appendChild('img');
				return true;
				
			}	
			else if(provider > 921 || provider < 999)
			{
				alert("Provider is vodafone");
				img.src = "file:///home/madhavsingh/Pixel6/vodafone.png";
				document.getElementById('providerInfo').appendChild('img');
				return true;
			}  
			else
			{
				return false
			}
		}

function onlyNumberKey(evt) 
{
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
    	return false; 
	
	return true;
}

function applyUpperCase()
{
	var name = document.getElementById("name").value;
		document.getElementById("name").value = name.toUpperCase();
}

function nameHandling()
	{
		var name = document.getElementById('name').value;

		if(document.getElementById('name').value.split(' ').length < 2) 
		{
		 	alert('Minimum two words are required');
		 	return false;
		}
		else 
		{
			return true;
		}

		var [firstName, lastName] = name.split(" ");

		alert(firstName);

		if(firstName.trim().length < 4)
		{
			alert("Length of word must be greater then equal to 4");
			return false;
		}
		else if(lastName.trim().length < 4)
		{
			alert("Length of word must be greater then equal to 4");
			return false;
		}
		else
		{
			return true;
		}
}

function displayBlock()
{
	var validationForm = document.getElementById('validation-form');

	if(validationForm.style.display === "none")

	{
		validationForm.style.display = "block";
	}
	else
	{
		validationForm.style.display = "none";
	}
}

function emailHandling() {
	var email = document.getElementById('email').value;

	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email').value))
      		{
        		return true;
      		}
      		else
      		{
		        alert("You have entered an invalid email address!");
		        return false;   
			}
}
		
function generateOTP() {  
	var digits = '0123456789'; 
	let OTP = ''; 
	for (let i = 0; i < 6; i++ ) { 
		OTP += digits[Math.floor(Math.random() * 10)]; 
	} 
		return OTP; 
} 

function value(form)
	{
		var otp = document.getElementById('otp').value;
		var count = 0;
			if(otp ==OTP )
			{
				window.location.href = "http://pixel6.co/";
			}
			else if(count == 3)
			{
					window.location.href ='http://pixel6.co/linux';
			}
			else
			{
				count++;
				window.location.href = "project.html";
			}
	}

function lettersOnly(evt) {
       evt = (evt) ? evt : event;
       var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
          ((evt.which) ? evt.which : 0));
       if (charCode > 32 && (charCode < 65 || charCode > 90) &&
          (charCode < 97 || charCode > 122)) {
          alert("Enter letters only.");
          return false;
       }
       return true;
     }