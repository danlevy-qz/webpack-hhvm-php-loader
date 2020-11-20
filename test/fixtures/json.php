<?hh

$user = array(
  'username' => 'justsml',
  'first_name' => 'Dan',
  'date_created' => '2020-12-01',
);

echo json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
