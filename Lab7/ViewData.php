<?php

    require_once 'DatabaseConnector.php';

    class ViewData {

        private $connector,
                $dbConn,
                
                $data;
        
        public function __construct($data) {
            // PASSED
            $this -> data = $data;

            // GLOBAL
            $this -> connector = new DatabaseConnector();

            // METHODS
            $this -> initializeConnection();
            
            // OUTPUT
            // echo $this -> data['case'];
            echo json_encode($this -> getData(
                $this -> data['case'], 
                $this -> data['id']
            ));
        }

        private function initializeConnection() {
            $DB_NAME = "cmsc126";
            $this -> dbConn = $this -> connector -> connectDatabase($DB_NAME);
        }

        private function getData($case, $requestID) {
            // $QUERY = "SELECT *
            //           FROM lab7";

            $QUERY = null;

            switch($case) {
                case "one":
                    $QUERY = "SELECT * 
                              FROM lab7";
                    break;
                case "all":
                    $QUERY = "SELECT * 
                              FROM lab7
                              WHERE id = '$requestID'";
                    break;
                default:
                    break;
            }

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

    $data = json_decode(file_get_contents('php://input'), true);

    new ViewData($data['request']);

?>