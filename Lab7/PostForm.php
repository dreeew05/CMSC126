<?php

    require_once 'DatabaseConnector.php';

    class AddEntry {

        private $action,
                $name,
                $age,
                $email,
                $address,

                $connector,
                $dbConn;

        public function __construct() {
            // GLOBAL
            $this -> connector = new DatabaseConnector();

            // METHODS
            $this -> initializeConnection();
            $this -> setPostData();
            $this -> determineAction();

        }

        private function setPostData() {
            $this -> action  = $_POST['action'];
            $this -> name    = $_POST['name'];
            $this -> age     = $_POST['age'];
            $this -> email   = $_POST['email'];
            $this -> address = $_POST['address'];
        }

        private function initializeConnection() {
            $DB_NAME = 'cmsc126';
            $this -> dbConn = $this -> connector -> connectDatabase($DB_NAME);
        }

        private function determineAction() {
            switch($this -> action) {
                case 'insert':
                    $this -> insertEntry();
                    break;
                case 'update':
                    $this -> updateEntry();
                    break;
                default:
                    break;
            }
        }

        private function insertEntry() {
            $imageFileName = $this -> uploadImage();

            $QUERY = "INSERT INTO lab7(name, age, email, address, imagePath)
                      VALUES('{$this -> name}', '{$this -> age}',
                            '{$this -> email}', '{$this -> address}',
                            '$imageFileName')";
            
            $RESULT = $this -> dbConn -> query($QUERY);

            $response = array(
                'operation' => 'fail'
            );

            if($RESULT) {
                $response['operation'] = 'success';
            }

            echo json_encode($response);
        }

        private function uploadImage() {
            $image      = $_FILES['imageFile'];
            $imageError = $_FILES['imageFile']['error'];
            $imageName  = $_FILES['imageFile']['name'];
            $tmpName    = $_FILES['imageFile']['tmp_name'];

            if(isset($image) && $imageError === UPLOAD_ERR_OK) {

                // UPLOAD IMAGE TO LOCAL
                $directory = './images/'; 
                $imageFile = $directory . basename($imageName);
                move_uploaded_file($tmpName, $imageFile);

                return $imageName;
            }
        }

        private function updateEntry() {
            $id    = $_POST['id'];
            $radio = $_POST['update-radio'];

            if($radio == 'new') {
                $imageFileName = $this -> uploadImage();
                $QUERY = "UPDATE lab7
                      SET name = '{$this -> name}', age = '{$this -> age}',
                            email = '{$this -> email}', 
                            address = '{$this -> address}',
                            imagePath = '$imageFileName'
                      WHERE id = '$id'";
            }
            else {
                $QUERY = "UPDATE lab7
                      SET name = '{$this -> name}', age = '{$this -> age}',
                            email = '{$this -> email}', 
                            address = '{$this -> address}'
                      WHERE id = '$id'";
            }

            

            $RESULT = $this -> dbConn -> query($QUERY);

            $response = array(
                'operation' => 'fail'
            );

            if($RESULT) {
                $response['operation'] = 'success';
            }

            echo json_encode($response);
        }

    }

    new AddEntry();

?>