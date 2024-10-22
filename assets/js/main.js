$(document).ready(function () {

    $('#formLogin').submit(function (event) {
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
            success: function (response) {
                $('#loading').hide();

                Cookies.set('sessionUser', formData.identifier, { expires: 1 });
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", formData.identifier);
                var loginTime = new Date().getTime();
                localStorage.setItem("loginTime", loginTime);

                window.location.href = "outlet.html";
            },
            error: function () {
                $('#loading').hide();
                alert('Mohon maaf username atau password yang Anda masukkan salah');
            }
        });
    });

    $('#formOutlet').submit(function (event) {
        event.preventDefault();

        // Get the form data
        var nik = $('#nik').val().trim();
        var phone = $('#phone').val().trim();
        var fullname = $('#fullname').val().trim();

        if (!nik && !fullname && !phone) {
            alert('Minimal harus terisi NIK, atau No. HP dan Nama Lengkap.');
            return;
        }
        var params
        if (nik) {
            params = "?nik=" + nik
        }
        if (phone) {
            params = "?phone=" + phone
        }
        if (fullname) {
            params = "?name=" + fullname
        }


        $('#loading').show();
        $.ajax({
            type: 'GET',
            url: 'https://asia-southeast2-accenture-283510.cloudfunctions.net/pegadaian-customer360' + params,
            contentType: 'application/json',
            success: function (response) {
                $('#loading').hide();
                if (nik) {
                    window.location.href = "data-nasabah.html?nik=" + nik;
                } else {
                    window.location.href = "data-nasabah.html?nik=" + response.data.audiences[0].nik
                }
            },
            error: function () {
                $('#loading').hide();
                alert('Mohon maaf data tidak ditemukan');
            }
        });



    });
});