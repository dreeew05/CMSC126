<?php

    require_once 'DatabaseConnector.php';

    class ViewData {

        private $connector,
                $dbConn;
        
        public function __construct() {
            // GLOBAL
            $this -> connector = new DatabaseConnector();

            // METHODS
            $this -> initializeConnection();
            
            // OUTPUT
            echo json_encode($this -> getAllData());
        }

        private function initializeConnection() {
            $DB_NAME = "cmsc126";
            $this -> dbConn = $this -> connector -> connectDatabase($DB_NAME);
        }

        private function getAllData() {
            $QUERY = "SELECT *
                      FROM lab7";

            $data = NULL;

            $RESULT = $this -> dbConn -> query($QUERY);

            if($RESULT -> num_rows > 0) {
                $data = [];
                $counter = 0;
                while($row = $RESULT -> fetch_assoc()) {
                    $id      = $row['id'];
                    $name    = $row['name'];
                    $age     = $row['age'];
                    $email   = $row['email'];
                    $address = $row['address'];
                    $imgPath = $row['imagePath'];

                    $data[$counter] = array(
                        'id' => $id,
                        'name' => $name,
                        'age' => $age,
                        'email' => $email,
                        'address' => $address,
                        'imagePath' => $imgPath
                    );
                    
                    $counter++;
                }
            }

            return $data;
        }

    }

    new ViewData();

?>