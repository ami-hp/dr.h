window.addEventListener("load", () => {
    const selected_span = document.getElementById('selected_data');
    const cart_btn_section = $("#cart-btn-section");
    let get_tag_html = (tag) => {
        let a;
        switch (tag) {
            case '1':
                a = "<a href='tel:123-456-7890' class='text-white'>تماس بگیرید</a>";
                break;

            case '2':
                a = '<div>سفارشی</div>';
                break;

            case '3':
                a = '<div>توقف تولید</div>';
                break;

            case '4':
                a = '<div>موجود نیست</div>';
                break;

            case '5':
                a = '<div>به زودی</div>';
                break;
        }
        return a;
    }
    let get_price_html = (price, prev = null) => {

        price = parseInt(price);


        html = `<div class="col-12 col-md-5 text-center addBasketBox f12-mxmd f14-mxlg f16 pointer" id="add-cart-btn">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20.3 20.3"> <g> <path fill="#FFFFFF" d="M7.4,8.7L7.4,8.7l-0.1,0C6.9,8.7,6.6,9,6.6,9.4c0,0.4,0.3,0.7,0.7,0.7h0l0.1,0c0.4,0,0.6-0.4,0.6-0.7 C8.1,9,7.8,8.7,7.4,8.7z"/> <path fill="#FFFFFF" d="M13,8.7L13,8.7l-0.1,0c-0.4,0-0.6,0.4-0.6,0.7c0,0.4,0.3,0.7,0.7,0.7h0l0.1,0c0.4,0,0.6-0.4,0.6-0.7 C13.8,9,13.4,8.7,13,8.7z"/> <path fill="#FFFFFF" d="M19.6,14.2l-0.8-6.1c-0.5-2.3-2-3.6-3.7-3.6H15c-0.3-2.5-2.3-4.4-4.9-4.4c-1.3,0-2.6,0.5-3.5,1.4 c-0.8,0.8-1.3,1.8-1.4,3h0C3.5,4.5,2,5.8,1.5,8.1L0.8,14c-0.6,4.3,1.4,6.2,5.3,6.2h8.1C17.9,20.2,20.1,18,19.6,14.2z M7.7,2.6 c0.7-0.6,1.5-1,2.5-1c1.7,0,3.2,1.3,3.4,2.9H6.7C6.8,3.8,7.2,3.1,7.7,2.6z M14.2,18.7H6.1c-3.1,0-4.4-1.2-3.9-4.5L3,8.3 C3.3,6.8,4.2,6,5.2,6h9.9c1,0,1.9,0.8,2.3,2.4l0.7,5.8C18.6,17.2,17.1,18.7,14.2,18.7z"/> </g> </svg>
                <span>افزودن به سبد خرید</span>
                </div>`;

        html += '<div class="col-12 col-md-6 d-flex flex-column align-items-end" id="cw_input" >';
        //off price start
        //html += '<div class=""><del>820,000</del> <span class="badge badge-danger">%15</span></div>';
        if (prev) {
            prev = parseInt(prev);
            html += "<small>";
            html += "<del>" + prev.toLocaleString("en") + " تومان</del>";
            html += "</small>";
        } else {
            html += "<del></del>";
        }
        //off price end
        html += '<div>';
        //main price start
        html += '<span class="h5 bold mt-1">' + price.toLocaleString("en") + '<span class="light h6">تومان</span></span>';
        //main price end
        html += '</div>';

        html += '</div>';


        return html;
    }


    if(selected_span.innerText.trim() === "is"){

        let selected = selected_span.getAttribute('data-params');

        var color = $(".color-img[data-id='" + selected.color + "']");
        $('.color-name').html($(color).data('name'));
        $(color).addClass('active');

        var html = "",
            warranties = $(color).data('param');

        if (warranties) {

            warranties.forEach(warranty => {
                if (warranty.id == selected.id) {
                    html += "<div class='warranty active' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                } else {
                    html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
            });

            $(".warranties").html(html);
        }


        // if (selected.storage == 0) {
        //     html = get_tag_html('4');
        // } else {

        if (selected.tag == "") {
            html = get_tag_html("4");
            cart_btn_section.html(html);
        } else {

            if (selected.tag == 0) {
                console.log(selected);
                html = get_price_html(selected.price, selected.prev);
            } else {
                // console.log(111);
                html = get_tag_html(selected.tag);
            }
        }

        // }

        cart_btn_section.html(html);

        $("#cw_data").data('id', selected.id);

    }



    // Select Color
    $(document).on("click", ".color-img", function () {

        $('.color-img').removeClass('active');
        $('.color-name').html($(this).data('name'));
        $(this).addClass('active');

        var html = "",
            warranties = $(this).data('param');

        warranties.forEach(warranty => {
            html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
        });

        $(".warranties").html(html);

        $('.warranty:first').addClass('active');

        var html, data = $('.warranty:first').data('param');

        // if (data.storage == 0) {
        //     html = get_tag_html('4');
        // } else {
        if (data.tag == 0) {
            html = get_price_html(data.price, data.prev_price);
        } else {
            html = get_tag_html(data.tag);
        }
        // }

        $("#cw_data").data('id', data.id);
        cart_btn_section.html(html);
    })
        .on('click', '.warranty', function () {
            // Select Warranty
            let html, data = $(this).data('param');
            $('.warranty').removeClass('active');
            $(this).addClass('active');

            // if (data.storage == 0) {
            //     html = get_tag_html('4');
            // } else {
            if (data.tag == 0) {
                html = get_price_html(data.price, data.prev_price);
            } else {
                html = get_tag_html(data.tag);
            }
            // }

            $("#cw_data").data('id', data.id);
            cart_btn_section.html(html);
        })
        .on('click', "#add-cart-btn", function () {

            console.log("add");

            $.ajax({
                url: "/cart/add",
                type: "POST",
                dataType: "json",
                data: {
                    'id': $("#cw_data").data('id'),
                },
                success: (data) => {
                    console.log(data);
                    show_cart();

                    swal({
                        'text': 'با موفقیت به سبد خرید اضافه شد',
                        'title': ' ',
                        'icon': 'success',
                        button: false,
                        timer: 2500,
                    });
                },
                error: (err) => {
                    console.log(err)
                }
            })


        });

});
