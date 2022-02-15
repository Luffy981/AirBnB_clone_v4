$(function () {
  const AmenitiesChecked = {};
  const StatesChecked = {};
  const LocationsChecked = {};
  const CitiesChecked = {};
  $(document).on('change', ".amenities > .popover > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    console.log(Object.values(AmenitiesChecked));
    if (Objs) {
      $('.amenities > h4').text(Objs.join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      StatesChecked[$(this).data('id')] = $(this).data('name');
      LocationsChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete StatesChecked[$(this).data('id')];
      delete LocationsChecked[$(this).data('id')];
    }
    const Objs = Object.values(LocationsChecked);
    console.log(Object.values(LocationsChecked));
    if (Objs) {
      $('div.locations > h4').text(Objs.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > ul > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      CitiesChecked[$(this).data('id')] = $(this).data('name');
      LocationsChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete CitiesChecked[$(this).data('id')];
      delete LocationsChecked[$(this).data('id')];
    }
    const Objs = Object.values(LocationsChecked);
    console.log(Object.values(LocationsChecked));
    if (Objs) {
      $('div.locations > h4').text(Objs.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const users = {};
  $.getJSON('http://172.23.179.134:5001/api/v1/users', (data) => {
    for (const usr of data) {
      users[usr.id] = usr.first_name + ' ' + usr.last_name;
      console.log(users);
    }
  });
  $.ajax({
    url: `http://${window.location.hostname}:5001/api/v1/places_search`,
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    success: data => {
      for (const place of data) {
        const template = `<article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
          <div class="image_guest"></div>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
      }
    }
  });
  $(':button').click(function () {
    $('.places > article').remove();
    $.ajax({
      url: `http://${window.location.hostname}:5001/api/v1/places_search`,
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(AmenitiesChecked), 'states': Object.keys(StatesChecked), 'cities': Object.keys(CitiesChecked) }),
      contentType: 'application/json',
      success: data => {
        for (const place of data) {
          const template = `<article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
          <div class="image_guest"></div>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
          $('section.places').append(template);
        }
      }
    });
  });
});
