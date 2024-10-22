function loading(flag) {
    if (flag) {
        $('#loading').show();
    } else {
        $('#loading').hide();
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function redirectPage(url) {
    var getNIK = getUrlParameter("nik");
    var getPhone = getUrlParameter("phone");
    var getName = getUrlParameter("name");
    if (getNIK) {
        window.location.href = url + "?nik=" + getNIK;
        return
    } else if (getPhone) {
        window.location.href = url + "?phone=" + getPhone;
        return
    } else if (getName) {
        window.location.href = url + "?name=" + getName;
        return
    } else {
        window.location.href = url;
    }
}

function calculateAge(birthdate) {
    var birthDate = new Date(birthdate);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function joinStringArray(str, glue) {
    try {
        const data = JSON.parse(str);
        return data.join(glue);
    } catch (e) {
        return '';
    }
};

function formatRupiah(number) {
    if (number == null || number === '') {
        return 'Rp. 0';
    }

    var reverse = number.toString().split('').reverse().join('');

    var rupiah = reverse.match(/\d{1,3}/g).join('.');

    return 'Rp. ' + rupiah.split('').reverse().join('');
}

function isCampaignRunning(start_date, end_date) {
    return (
        !end_date ||
        (dateTime(start_date) < dateTime() &&
            dateTime(end_date) > dateTime())
    );
};

function formatDate(dateString) {
    dateString = dateString.replace(' ', 'T');

    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return day + '-' + month + '-' + year;
}

function toEmptyString(value) {
    return value == null ? '' : value; 
}

// var getNIK = getUrlParameter("nik");
// if(getNIK){
//     $("#input-nik").val(getNIK);
// }
// var getPhone = getUrlParameter("phone");
// if(getPhone){
//     $("#input-nohp").val(getPhone);
// }
// var getName = getUrlParameter("name");
// if(getName){
//     $("#input-nama").val(getName);
// }

$(document).ready(function () {
    var sessionUser = Cookies.get('sessionUser');
    var username = localStorage.getItem("username");
    if (!sessionUser && !username) {
        window.location.href = "login.html";
    }
    if (sessionUser) {
        $('#tag-username').text(sessionUser)
    }

    if (username) {
        $('#tag-username').text(username)
    }
    $('#logoutButton').click(function () {

        Cookies.remove('sessionUser');

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("loginTime");

        window.location.href = "login.html";
    });

    $('#input-nik').keydown(function(event) {
        if (event.keyCode === 13) { 
            event.preventDefault(); 
            var nik = $(this).val();
            $("#input-nohp").val("");
            $("#input-nama").val("");
            alert("Search : "+nik);
        }
    });

    $('#input-nohp').keydown(function(event) {
        if (event.keyCode === 13) { 
            event.preventDefault(); 
            var nohp = $(this).val();
            $("#input-nik").val("");
            $("#input-nama").val("");
            alert("Search : "+nohp);
        }
    });

    $('#input-nama').keydown(function(event) {
        if (event.keyCode === 13) { 
            event.preventDefault(); 
            var nama = $(this).val();
            $("#input-nohp").val("");
            $("#input-nik").val("");
            alert("Search : "+nama);
        }
    });
});