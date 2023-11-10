const body = $(`body`);
const practical_btn = $('#practicalBtn');
practical_btn.find('.active-back').removeClass('active-back');
practical_btn.find('.active-color').removeClass('active-color');
practical_btn.find('path').attr('fill', 'white');

/*panel js requirement*/
$('[data-kill]').click(function () {
    var attr = $(this).data("kill");
    $(document).find("[data-bait='" + attr + "']").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });

});

$('[data-hunt]').click(function () {
    var hunt = $(this).data("hunt");
    var gun = $(this).data("gun");
    var all = $(this).data("all");

    if (all) {
        $(document).find("[class*='active']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    } else {
        $(document).find("[class*='active']:not('.no')").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    }

    $(document).find("[data-bait='" + hunt + "']").toggleClass("active-" + gun);

});

$('[data-kill] [data-merci]').click(function (event) {
    event.stopPropagation();
});

$('[data-slidein]').on('click', function () {
    var slide = $(this).data('slidein');
    $(document).find('[data-slide="' + slide + '"]').addClass('active-top');
});

$('[data-slideout]').on('click', function () {
    var slide = $(this).data('slideout');
    $(document).find('[data-slide="' + slide + '"]').removeClass('active-top');
});

$('[data-back]').on('click', function () {
    $('#practicalBtn').find('path').attr('fill', 'white');
    $('#practicalBtn').find('.active-back').removeClass('active-back');
    $(this).closest('div').addClass('active-back');
    $(this).addClass('active-color');
    $(this).prev().find('path').attr('fill', 'var(--panel-hex-main)');
    $('.profile-aside').addClass('profile-aside-mx-content');
});

$('[data-fadein]').click(function () {
    var delay = $(this).data('fadedelay');
    var fadeTarget = $(this).data('fadein');
    if (delay) {
        setTimeout(function () {
            $(document).find('[data-fade="' + fadeTarget + '"]').fadeIn();
        }, delay * 1000);
    } else {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeIn();
    }


});

$('[data-fadeout]').on('click', function () {
    var delay = $(this).data('fadedelay');
    var fadeTarget = $(this).data('fadeout');
    if (delay) {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeOut(delay * 1000);
    } else {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeOut();
    }

});

$('[data-fade="add-address"]').on('click', function () {
    $(this).fadeOut();
});

$('[data-fadeout] [data-frez]').on('click', function (e) {
    e.stopPropagation()
});

$('[data-rate]').on('click', function () {
    var rate = $(this).data('rate');
    var rateBox = $(this).closest('[data-ratebox]');
    var mainBox = $(this).closest('[data-comehere]');
    var myArray = rateBox.find('[data-rate]');
    myArray.each(function () {
        var star = $(this).data('rate');
        if (rate >= star) {
            rateBox.find('[data-rate="' + star + '"] path').attr('fill', 'var(--panel-hex-star)');
        } else {
            rateBox.find('[data-rate="' + star + '"] path').attr('fill', 'var(--panel-hex-off)');
        }
        mainBox.next().find('[data-userrate]').val(rate);

    });
});

//just for tablet and mobile
(function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
            //close menu when click out of area
            $('#panel-right-side').click(function () {
                $('#panel-right-side').removeClass('active-menuback');
                $('#panel-right-side .main-box').removeClass('active-menu');
                $('[data-menuclose] svg').removeClass('active-opacity');
                $('.user-info-box').removeClass('active-opacity');
                $('.profile-aside').addClass('profile-aside-mx-content');
            });

            $('#panel-right-side .main-box').click(function (e) {
                e.stopPropagation()
            });

            $('[data-menuclose]').on('click', function () {
                $('#panel-right-side').removeClass('active-menuback');
                $('#panel-right-side .main-box').removeClass('active-menu');
                $('[data-menuclose] svg').removeClass('active-opacity');
                $('.user-info-box').removeClass('active-opacity');

            });

            $('[data-menuopen]').on('click', function () {
                $('#panel-right-side').addClass('active-menuback');
                $('#panel-right-side .main-box').addClass('active-menu');
                $('[data-menuclose] svg').addClass('active-opacity');
                $('.user-info-box').addClass('active-opacity');
                $('.profile-aside').removeClass('profile-aside-mx-content');
            });
        }
    }
)();
//just for tablet and mobile

//panel js requirement


// -----------------------------------------------------------------------------------------------------------------------


// Info
body.on('click', '.edit-address', function (e) {

    $(".edit-address-btn").data('id', $(this).data("id"));

    $('#edit-address-modal select[name ="province"]').val($(this).data("province"));
    $('#edit-address-modal textarea[name ="address"]').val($(this).data("address"));
    $('#edit-address-modal input[name ="postal_code"]').val($(this).data("postal_code"));

    let index = $("#edit-address-modal .provinces-list").find(":selected").data('key');
    let city = "";

    provinces[index].cities.forEach(function (val, key) {
        city += "<option value='" + val.faname + "'>" + val.faname + "</option>";
    });

    $("#edit-address-modal .cities-list").html(city).attr('disabled', false);
    $('#edit-address-modal select[name ="city"]').val($(this).data("city"));
    $("#edit-address-modal").modal("show");
});
$('#info_form').submit(function (event) {
    event.preventDefault();
    let form = $(this);
    $.ajax({
        url: "/ajax/info",
        type: 'POST',
        data: form.serialize(),
        beforeSend: () => {
            loading('start')
        },
        success: (data) => {
            swal({
                title: " ",
                text: 'اطلاعات شما با موفقیت ثبت شد',
                icon: 'success',
                button: false,
                timer: 1500,
            }).then(
                loading('stop')
            );
        },
        error: (data) => {
            swal({
                title: " ",
                text: 'خطا در انجام عملیات',
                icon: 'error',
                button: false,
                timer: 1500,
            }).then(
                loading('stop')
            );
            console.log(data.responseText);
        }
    });
})

$(".open-address-modal").click(function () {
    $(".add-address-btn").removeClass('edit-address-btn');
    $("#address-modal").modal("show");
});

$(".add-address-btn").click(function () {
    let province = $('select[name ="province"]').val();
    let city = $('select[name ="city"]').val();
    let address = $('textarea[name ="address"]').val().trim();
    let postal_code = $('input[name ="postal_code"]').val().trim();

    if (province != "" && city != "" && address != "") {

        $.ajax({
            url: '/address/add',
            type: 'POST',
            dataType: 'JSON',
            data: {
                'province': province,
                'city': city,
                'address': address,
                'postal_code': postal_code,
            },
            beforeSend: () => {
                loading('start')
            },
            success: (response) => {
                let html = "";
                response.forEach(element => {

                    html += `<div class="row mx-0 mt-3">
                                <div class=" col-sm-10 col-9">
                                    <span class="text-right d-block h8 h6-md">${element.province} - ${element.city} - ${element.address}</span>
                                    <small class="text-right d-block">کد پستی: ${element.postal_code}</small>
                                </div>

                                <div class="col-sm-2 col-2">
                                    <span class="h8 h7-md mx-sm-1 pointer text-main font-bold edit-address" data-id="${element.id}" data-province="${element.province}" data-city="${element.city}" data-address="${element.address}" data-postal_code="${element.postal_code}">ویرایش</span>
                                    <span class="h8 h7-md mx-sm-1 pointer text-main font-bold delete-address" data-address="${element.id}">حذف</span>
                                </div>
                            </div>`;
                });

                $(".address-content").html(html);
                $("#address-modal").modal('hide');

                swal({
                    icon: 'success',
                    title: ' ',
                    text: 'با موفقیت ثبت شد',
                    button: false,
                    timer: 2500,
                })
                    .then(
                        loading('stop')
                    )

            },
            error: (error) => {
                swal({
                    icon: 'error',
                    title: ' ',
                    text: 'خطا در ثبت اطلاعات',
                    button: false,
                    timer: 2500,
                })
                    .then(
                        loading('stop')
                    )
                // console.log(error.responseText);
            }
        });
    } else {
        swal({
            icon: 'error',
            title: 'خطا',
            text: 'همه اطلاعات را وارد نمایید',
            button: false,
            timer: 2000
        });
    }
});

$(".edit-address-btn").click(function () {

    let id = $(this).data('id');
    let province = $('#edit-address-modal select[name ="province"]').val();
    let city = $('#edit-address-modal select[name ="city"]').val();
    let address = $('#edit-address-modal textarea[name ="address"]').val();
    let postal_code = $('#edit-address-modal input[name ="postal_code"]').val();

    if (province != "" && city != "" && address != "") {

        $.ajax({
            url: '/address/edit/' + id,
            type: 'POST',
            dataType: 'JSON',
            data: {
                'province': province,
                'city': city,
                'address': address,
                'postal_code': postal_code,
            },
            beforeSend: () => {
                loading('start')
            },
            success: function (response) {

                let html = "";
                response.forEach(element => {

                    html += `<div class="row mx-0 mt-3">
                                <div class=" col-sm-10 col-9">
                                    <span class="text-right d-block h8 h6-md">${element.province} - ${element.city} - ${element.address}</span>
                                    <small class="text-right d-block">کد پستی: ${element.postal_code}</small>
                                </div>

                                <div class="col-sm-2 col-2">
                                    <span class="h8 h7-md mx-sm-1 pointer text-main font-bold edit-address" data-id="${element.id}" data-province="${element.province}" data-city="${element.city}" data-address="${element.address}" data-postal_code="${element.postal_code}">ویرایش</span>
                                    <span class="h8 h7-md mx-sm-1 pointer text-main font-bold delete-address" data-address="${element.id}">حذف</span>
                                </div>
                            </div>`;
                });

                $(".address-content").html(html);
                $("#edit-address-modal").modal("hide");


                swal({
                    icon: 'success',
                    title: ' ',
                    text: 'با موفقیت ویرایش شد',
                    button: false,
                    timer: 2500,
                }).then(loading('stop'))
            },
            error: (error) => {

                swal({
                    icon: 'error',
                    title: ' ',
                    text: 'خطا در انجام عملیات',
                    button: false,

                }).then(loading('stop'))
                console.log(error.responseText)
            }
        });
    } else {
        swal({
            icon: 'error',
            title: 'خطا',
            text: 'همه اطلاعات را وارد نمایید',
            button: false,
            timer: 2000
        });
    }
});

body.on('click', '.delete-address', function (e) {

    var address = $(this);

    swal({
        title: " ",
        text: "آیا مطمئنید میخواهید حذف کنید؟",
        icon: "error",
        // buttons: true,
        buttons: ["خیر", "بله"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: '/address/delete',
                    method: 'POST',
                    data: {
                        'id': $(this).data('address')
                    },
                    beforeSend: () => {
                        loading('start')
                    },
                    success: function (response) {
                        loading('stop');
                        $(address).closest('.row').remove();
                    }
                });

            }
        });

});

// -----------------------------------------------------------------------------------------------------------------------

let get_order_html = (response) => {

    let total_price = response.order.price;
    let html;
    if(response.type == "order"){
         html = `<div class='row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 pb-3 font-weight-bold'>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>کد پیگیری : </span>
                    <span>${response.order.code}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>تاریخ سفارش : </span>
                    <span class='nowrap'>${response.order.date}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>نام و نام خانوادگی : </span>
                    <span>${response.order.user}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>آدرس : </span>
                    <span>${response.order.address.province} - ${response.order.address.city} - ${response.order.address.address}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>کد پستی : </span>
                    <span>${response.order.address.postal_code}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>کد ملی : </span>
                    <span>${response.order.code_meli}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>عملیات پرداخت : </span>
                    <span class='text-success'>موفق</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>وضعیت سفارش : </span>
                    <span class='nowrap'>${response.order.status}</span>
                </div>`;

        if (response.order.gift_wrapping) {
            html += `    <div class='col py-2'>
                        <span class='text-var-primary-500'>کادوپیچی : </span>
                        <span class='text-success'>${response.order.gift_wrapping.toLocaleString("en")}</span>
                        <span class='small'>تومان</span>
                    </div>`;
        }

        html += `    <div class='col py-2'>
                    <span class='text-var-primary-500'>جمع مبلغ : </span>
                    <span class='text-success'>` + total_price.toLocaleString("en") + `</span>
                    <span class='small'>تومان</span>
                </div>
            </div>`;

        response.products.forEach(product => {

            html += `<div class='row border-top py-4 font-weight-bold'>
                    <div class='col-xl-2 col-12'>`;
            if(product.slug && product.image){
                html +=`<a href='${product.slug}'>
                    <img src='${product.image}' class='rounded'>
                    </a>`;
            }

            html += `</div>
                    <div class='col-xl-10 col-12 text-right'>
                        <div class='my-3'>
                            <span class='text-var-primary-500'>نام : </span>
                            <span>${product.name}</span>
                        </div>`;

            if (product.color) {
                html += `        <div class='mb-3'>
                                <span class='text-var-primary-500'>رنگ : </span>
                                <span>${product.color}</span>
                            </div>`;
            }

            if (product.warranty) {
                html += `        <div class='mb-3'>
                                <span class='text-var-primary-500'>گارانتی : </span>
                                <span>${product.warranty}</span>
                            </div>`;
            }

            html += `        <div class='mb-3'>
                            <span class='text-var-primary-500'>تعداد : </span>
                            <span>${product.count}</span>
                            <span> عدد</span>
                        </div>
                        <div class='mb-3'>
                            <span class='text-var-primary-500'>مبلغ : </span>
                            <span class='text-success'>${product.price.toLocaleString("en")}</span>
                            <span class='small'> تومان</span>
                        </div>
                    </div>
                </div>`;

        });
    }

    else if(response.type == "download"){
         html = `<div class='row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 pb-3 font-weight-bold'>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>کد پیگیری : </span>
                    <span>${response.order.code}</span>
                </div>
                <div class='col py-2'>
                    <span class='text-var-primary-500'>تاریخ سفارش : </span>
                    <span class='nowrap'>${response.order.date}</span>
                </div>


                <div class='col py-2'>
                    <span class='text-var-primary-500'>عملیات پرداخت : </span>
                    <span class='text-success'>موفق</span>
                </div>`;

        html += `    <div class='col py-2'>
                    <span class='text-var-primary-500'>جمع مبلغ : </span>
                    <span class='text-success'>` + total_price.toLocaleString("en") + `</span>
                    <span class='small'>تومان</span>
                </div>
            </div>`;

            html += `<div class='row border-top py-4 font-weight-bold'>
                    <div class='col-xl-2 col-12'>`;
        if(response.product.link && response.product.image){
            html += `<a href='${response.product.link}'><img src='${response.product.image}' class='rounded'></a>`;
        }


        html += `</div>
        <div class='col-xl-10 col-12 text-right'>
            <div class='my-3'>
                <span class='text-var-primary-500'>نام : </span>
                <span>${response.product.name}</span>
            </div>
        </div>`;

    }


    return html;
}

// Order
$(".myOrder").click(function () {

    $.ajax({
        url: '/order/get',
        method: 'POST',
        data: {
            'id': $(this).data('order'),
            'type': $(this).data('type'),
        },
        beforeSend: () => {
            loading('start')
        },
        success: function (response) {

            let html = get_order_html(response);
            $(".order-products").html(html);

            loading('stop');

        },
        error: function (err) {
            console.log(err.responseText);
            loading('stop');
        }

    })
})

// -----------------------------------------------------------------------------------------------------------------------

// Ticket
$('#ticket-form').submit(function (event) {
    event.preventDefault();
    let form = $(this);

    $.ajax({
        url: "/ajax/ticket",
        type: 'POST',
        data: form.serialize(),
        beforeSend: function () {
            loading('start')
        },
        success: function (data) {
            swal({
                title: " ",
                text: 'تیکت شما با موفقیت ارسال شد',
                icon: 'success',
                button: false,
                timer: 1500,
            }).then(
                loading('stop')
            );

            form.find('input').val('');
            form.find('textarea').val('');
        },
        error: function (data) {
            swal({
                title: " ",
                text: 'خطا در انجام عملیات',
                icon: 'error',
                button: false,
                timer: 1500,
            }).then(
                loading('stop')
            );
            console.log(data.responseText);
        }
    });
});


// -----------------------------------------------------------------------------------------------------------------------

// Messages
body
    .on('click', '[data-unseen]', function () {

        let selector = $(this);
        let notificationID = $(this).attr('data-unseen');
        $.ajax({
            url: '/ajax/msgseen',
            type: 'POST',
            data: {"notificationID": notificationID},
            beforeSend: () => {
                loading('start')
            },
            success: function (data) {

                loading('stop');

                selector.removeAttr('data-unseen');
                selector.find('.unSeenBox').remove();
                if (data != 0) {
                    $(document).find('[data-msg]').html(data);
                } else {
                    $(document).find('[data-msg]').remove();
                }

            },
            error: function (data) {
                loading('stop');
                let error = data.responseText;
                console.log(error)
            }
        });

    })
    .on('click', '[data-notifInfo]', function () {
        let notification = $(this).attr('data-notifInfo');
        notification = JSON.parse(notification);
        let messageBox = $('#message-overall');
        messageBox.find('#m-subject').html(notification.subject);
        messageBox.find('#m-message').html(notification.message);
        messageBox.find('#m-image').attr('src', notification.image);
        messageBox.find('#m-date').html(notification.date);
    });
