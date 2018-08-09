$(() => {
  $('button#login').click(verifyLogin);
});

const verifyLogin = () => {
  $.post('login/', {
    username: $('input#username').val(),
    password: $('input#password').val()
  })
    .done(loginSuccess)
    .fail(loginFail);
};

const loginFail = () => {
  $('#loginModal').modal();
};

const loginSuccess = data => {
  switch (data.role) {
    case 'admin':
      $(location).attr('href', 'owners.php');
      break;
    case 'owner':
      $(location).attr('href', 'pets.php');
      break;
    default:
      $(location).attr('href', 'index.php');
      break;
  }
};
