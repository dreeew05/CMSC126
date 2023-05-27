<?php

    require_once 'DatabaseConnector.php';

    class CreateDatabase {

        private $connector,
                $sqlConn,
                $dbConn,
                
                $DB_NAME = "cmsc126";
        
        public function __construct() {
            // GLOBAL
            $this -> connector = new DatabaseConnector();

            // METHODS
            $this -> initializeSQLConnection();
            $this -> generateData();
        }

        private function getDBName() {
            return $this -> DB_NAME;
        }

        private function initializeSQLConnection() {
            $this -> sqlConn = $this -> connector -> connectSQL();
        }

        private function setDBConnection() {
            $this -> dbConn  = $this -> connector -> connectDatabase($this -> getDBName());
        }

        private function createDatabase() {
            $QUERY  = "CREATE DATABASE IF NOT EXISTS {$this -> getDBName()}";
            $RESULT = $this -> sqlConn -> query($QUERY);

            if(!$RESULT) {
                die("Cannot Create Database " . $this -> sqlConn -> error);
            }

            // CHANGE CONNECTION TO SPECIFIC DATABASE
            $this -> setDBConnection();
        }

        private function createTable() {
            $QUERY = "CREATE TABLE IF NOT EXISTS lab7 (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                age INT(2) NOT NULL,
                email VARCHAR(50) NOT NULL,
                address VARCHAR(100) NOT NULL, 
                imagePath VARCHAR(50) NOT NULL
                )";

            $RESULT = $this -> dbConn -> query($QUERY);

            if(!$RESULT) {
                die("Cannot Create Database " . $this -> sqlConn -> error);
            }
            
        }

        private function generateData() {
            $this -> createDatabase();
            $this -> createTable();
        }

    }

?>