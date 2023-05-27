<!DOCTYPE html>
    <head>
        <?php 
            require_once 'CreateDatabase.php';

            new CreateDatabase();
        ?>

        <!-- BOOTSTRAP -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

        <!-- CSS -->
        <link rel="stylesheet" href="index.css">

        <!-- JAVASCRIPT -->
        <script src="index.js" type="module"></script>
    </head>
    <body>
        
        <!-- INSERT DATA -->
        <div id="form-data">
            <h1>Insert Data</h1>
            <form id="register-details" action="AddEntry.php" method="post" enctype="multipart/form-data">
                <label for="name">Name</label><br>
                <input type="text" name="name" id="name"><br>
                <label for="age">Age</label><br>
                <input type="number" name="age" id="age"><br>
                <label for="email">Email</label><br>
                <input type="email" name="email" id="email"><br>
                <label for="address">Address</label><br>
                <input type="text" name="address" id="address"><br>
                <label for="imageFile" class="form-label">Image</label>
                <input class="form-control" type="file" id="imageFile" name="imageFile">  
                <button type="submit" class="btn btn-success">Submit</button>    
            </form>
        </div>

        <!-- DISPLAY ALL DATA -->
        <div id="display-data">
            <h1>Display All Data</h1>
            <table id="display-table">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Image</th>
                </tr>
            </table>
        </div>

        <!-- SELECT SPECIFIC DATA -->

    </body>
</html>