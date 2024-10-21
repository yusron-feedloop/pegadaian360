$(document).ready(function(){
    
    $('#formLogin').submit(function(event){
        event.preventDefault(); 
        // Get the form data
        var formData = {
            identifier: $('input[name="userId"]').val(),
            password: $('input[name="password"]').val()
        };
        $('#loading').show();

        $.ajax({
            type: 'POST',
            url: 'https://staging-qore-data-whale-474358.qore.dev/v1/authorize',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                $('#loading').hide();

                Cookies.set('sessionUser', formData.identifier, { expires: 1 });
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", formData.identifier);
                var loginTime = new Date().getTime();
                localStorage.setItem("loginTime", loginTime);

                window.location.href = "outlet.html";
            },
            error: function() {
                $('#loading').hide();
                alert('Mohon maaf username atau password yang Anda masukkan salah');
            }
        });
    });

    $('#formOutlet').submit(function(event){
        event.preventDefault(); 

        // Get the form data
        var nik = $('#nik').val().trim();
        var phone = $('#phone').val().trim();
        var fullname = $('#fullname').val().trim();
        
        if (!nik && !fullname && !phone) {
            alert('Minimal harus terisi NIK, atau No. HP dan Nama Lengkap.');
            return;
        }

        if(nik){
            window.location.href = "dashboard.html?nik="+nik;
        }

        if(phone){
            window.location.href = "dashboard.html?phone="+phone;
        }

        if(fullname){
            window.location.href = "dashboard.html?name="+fullname;
        }
        


        // $.ajax({
        //     type: 'GET',
        //     url: 'https://customer360.pegadaian.co.id/api/audience_detail?id='+nik,
        //     contentType: 'application/json',
        //     data: JSON.stringify({}),
        //     success: function(response) {
        //         alert('sukses');
        //         window.location.href = "dashboard.html";
        //     },
        //     error: function() {
        //         alert('Mohon maaf data tidak ditemukan');
        //     }
        // });
        
    



    });
});