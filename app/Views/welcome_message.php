<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <!-- jquery -->
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> -->

    <!-- notify plugin jquery -->
    <link rel="stylesheet" href="<?= base_url('css/notify-metro.css')?>">
    <link rel="stylesheet" href="<?= base_url('css/custom.css')?>">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="<?= base_url('js/notify.js')?>"></script>
    <script src="<?= base_url('js/notify-metro.js')?>"></script>

    <!-- custom pl -->
    <script src="<?= base_url('js/custom.js')?>"></script>

    <title>cSystem</title>
  </head>
  <body>
    <h1 class="text-center mt-2"> Comment System without page relod in ajax with jquery</h1>

    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
            <input type="text" id="comment" class="form-control w-50 mx-2" placeholder="Write an comment"> 
            <input type="button" id="submit" value="Post"  class="btn btn-warning">
        </div>

        <section class="comment-section my-4" id="commentSection">
        </section>
    </div>
        
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </body>
</html>