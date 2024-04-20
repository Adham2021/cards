$(document).ready(function () {
  // Counter for content fields
  var contentCount = 1;
  // Counter for meal number
  var mealNumber = 2;

  // Add content fields dynamically
  $('#addContent').click(function () {
    var contentHtml = `
  <div class="form-row" id="contentRow${contentCount}">
    <div class="col">
      <input type="text" class="form-control contentName" placeholder="Content Name">
    </div>
    <div class="col">
      <input type="text" class="form-control contentPrice" placeholder="Content Price" value="0">
    </div>
    <div class="col">
      <div class="form-check">
        <input class="form-check-input isConstant" type="checkbox" id="constantCheckbox${contentCount}">
        <label class="form-check-label" for="constantCheckbox${contentCount}">
          Constant
        </label>
      </div>
    </div>
    <div class="col">
      <button type="button" class="btn btn-danger removeContent" data-rowid="${contentCount}">Remove</button>
    </div>
  </div>
`;

// You can then use JavaScript to handle the logic based on the checkbox state.

    $('#mealContents').append(contentHtml);
    contentCount++;
  });

  // Remove content fields dynamically
  $(document).on('click', '.removeContent', function () {
    var rowId = $(this).data('rowid');
    $('#contentRow' + rowId).remove();
  });

  // Add meal dynamically
  $('#addMeal').click(function () {
    var tabId = $('#tabSelect').val();
    var mealName = $('#mealName').val();
    var mealPrice = $('#mealPrice').val();
    var mealImageUrl = $('#mealImageUrl').val();
    var mealContents = [];

    $('.contentName').each(function () {
      var contentName = $(this).val();
      var contentPrice = $(this).closest('.form-row').find('.contentPrice').val();
      contentPrice = contentPrice ? contentPrice : '0';
      if (parseFloat(contentPrice) !== 0) {
        contentName += ' +' + contentPrice;
      }
      mealContents.push(contentName);
    });

    var mealHtml = `
          <div class="col-sm-6 col-lg-3">
            <div class="menu-7-item">
              <div class="menu-7-img rel">
                <img class="img-fluid" src="${mealImageUrl}" alt="menu-image">
                <div class="menu-7-price bg-coffee">
                  <h5 class="h5-xs yellow-color">${mealPrice} ₪</h5>
                </div>
                <div class="item-rating">
                  <div class="stars-rating stars-lg">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="menu-7-txt rel meal" data-meal-name="${mealName}">
                <h5 class="h5-sm">${mealName}</h5>
                <div style="margin-bottom: 10px;">
                  <label for="quantity-meal${mealNumber}" style="margin-right: 5px;"></label>
                  <div style="display: inline-block;">
                    <span style="cursor: pointer;" onclick="decreaseQuantity('quantity-meal${mealNumber}')">
                      <i class="fas fa-minus"></i>
                    </span>
                    <input type="number" id="quantity-meal${mealNumber}" value="1" min="1" style="width: 50px; text-align: center;" readonly class="quantity-input">
                    <span style="cursor: pointer;" onclick="increaseQuantity('quantity-meal${mealNumber}')">
                      <i class="fas fa-plus"></i>
                    </span>
                  </div>
                </div>
               
    `;
    if(mealContents.length > 0){
      mealHtml+=` <table class="mealContentsTable">
      <tr>
        <td class="seperateContents">اضافات :</td>
      </tr>`
    }

    mealContents.forEach(function (content, index) {
      var price = content.split(' +')[1] || '0';
      var isConstant = $("#constantCheckbox" + (index + 1)).prop("checked");
      mealHtml += `
      <tr>
        <td>
          <label for="content${index + 1}-meal${mealNumber}">
            <input type="checkbox" id="content${index + 1}-meal${mealNumber}" data-price="${price}" ${isConstant ? 'class="preventUncheck"' : ''} 
            ${isConstant ? 'checked' : ''}>${content}
          </label>
        </td>
      </tr>
    `;
    
    });
    if(mealContents.length > 0){
        mealHtml+=`</table>`
    }
    mealHtml += `
             
              <a onclick="addToCart(this, ${mealPrice})" class="btn btn-sm btn-tra-grey yellow-hover add-toCart">
                <i class="fas fa-shopping-bag"></i> اضف الى الطلبية
              </a>
            </div>
          </div>
          </div>
    `;

    $('#tabs-content').append(mealHtml);

    // Update the textarea with the generated mealHtml
    $('#mealHtmlTextarea').val(mealHtml);

    // Increment meal number for next meal
    mealNumber++;
  });
});
