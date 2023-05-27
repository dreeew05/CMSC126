<?php 

    class DatabaseConnector {

        private $SERVERNAME  = 'localhost',
                $DB_USERNAME = 'root',
                $DB_PASSWORD = '';

        public function connectSQL() {
            $connection = new mysqli($this -> SERVERNAME,
                                     $this -> DB_USERNAME,
                                     $this -> DB_PASSWORD);
            
            return $this -> errorChecker($connection);
        }

        public function connectDatabase($DB_NAME) {
            $connection = new mysqli($this -> SERVERNAME,
                                     $this -> DB_USERNAME,
                                     $this -> DB_PASSWORD,
                                     $DB_NAME);

            return $this -> errorChecker($connection);
        }

        private function errorChecker($connection) {
            if($connection -> connect_error) {
                die("Connection Failed: " . $connection -> connect_error);
            }
            return $connection;
        }

    }

?>