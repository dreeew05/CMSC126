<?php

    require_once 'DatabaseConnector.php';

    class DeleteData {
        
        private $connector,
                $dbConn,

                $id;
        
        public function __construct($id) {
            // PASSED
            $this -> id = $id;

            //  GLOBAL
            $this -> connector = new DatabaseConnector();

            // METHODS
            $this -> initializeConnection();

            // OUTPUT
            echo json_encode($this -> deleteData());
        }

        private function getID() {
            return $this -> id;
        }

        private function initializeConnection() {
            $DB_NAME = "cmsc126";
            $this -> dbConn = $this -> connector -> connectDatabase($DB_NAME);
        }

        private function deleteData() {
            $QUERY = "DELETE FROM lab7
                      WHERE id = '{$this -> getID()}'";
            
            $RESULT = $this -> dbConn -> query($QUERY);

            $response = array(
                'operation' => 'fail'
            );

            if($RESULT) {
                $response['operation'] = 'success';
            }

            return $response;
        }

    }

    $data = json_decode(file_get_contents('php://input'), true);
    new DeleteData($data['query']);

?>