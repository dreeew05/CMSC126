<?php

    require_once 'DatabaseConnector.php';

    class AddEntry {

        private $name,
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
            $this -> insertEntry();
        }

        private function setPostData() {
            $this -> name    = $_POST['name'];
            $this -> age     = $_POST['age'];
            $this -> email   = $_POST['email'];
            $this -> address = $_POST['address'];
        }

        private function initializeConnection() {
            $DB_NAME = 'cmsc126';
            $this -> dbConn = $this -> connector -> connectDatabase($DB_NAME);
        }

        private function insertEntry() {
            $imageFileName = $this -> uploadImage();

            $QUERY = "INSERT INTO lab7(name, age, email, address, imagePath)
                      VALUES('{$this -> name}', '{$this -> age}',
                            '{$this -> email}', '{$this -> address}',
                            '$imageFileName')";
            
            $RESULT = $this -> dbConn -> query($QUERY);

            if($RESULT) {
                header("Location: http://localhost/CMSC126/Lab7/index.php");
            }
            die();

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

    }

    new AddEntry();

?>