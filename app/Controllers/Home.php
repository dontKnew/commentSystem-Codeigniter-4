<?php

namespace App\Controllers;
use App\Models\CommentModel;
use CodeIgniter\I18n\Time;

class Home extends BaseController
{
    public function index()
    {
        if ($this->request->getMethod() == "post") {
            $commentModel = new CommentModel();

            $data = [
                'comment' => $this->request->getVar("comment"),
            ];
            try {
                $commentModel->save($data);
                return $this->response->setJSON(['status'=>'OK']);
            } catch(\Exception $e){
                return $this->response->setJSON(['status'=>$e]);
            }
        }else {
            // return $this->response->setJSON(['status'=>'post method does not exist']);
            return view("welcome_message");
        }
    }

    public function getComment()
    {
        $commentModel = new CommentModel();
        try {
            
            $data = $commentModel->orderBy('id', 'DESC')->where('reply_id',0)->findAll();
            $newData = array();
            foreach($data as $item){
                $time = Time::parse($item['created_at'], 'Asia/Kolkata');
                $timez = $time->humanize();
                array_push($newData, ["id"=>$item['id'], "comment"=>$item['comment'], "reply_id"=>$item['reply_id'],"created_at"=>$timez]);
            }
            return $this->response->setJSON(['status'=>'OK', 'data'=>$newData]);

        } catch(\Exception $e){
            return $this->response->setJSON(['status'=>$e]);
        }
    }

    public function getCommentReply($id=null)
    {
        $commentModel = new CommentModel();
        try {
            $data = $commentModel->orderBy('reply_id', 'DESC')->where('reply_id',$id)->findAll();
            $newData = array();
            foreach($data as $item){
                $time = Time::parse($item['created_at'], 'Asia/Kolkata');
                $timez = $time->humanize();
                array_push($newData, ["id"=>$item['id'], "comment"=>$item['comment'], "reply_id"=>$item['reply_id'],"created_at"=>$timez]);
            }
            return $this->response->setJSON(['status'=>'OK', 'data'=>$newData]);
        } catch(\Exception $e){
            return $this->response->setJSON(['status'=>$e]);
        }
    }

    public function addCommentReply()
    {
        if ($this->request->getMethod() == "post") {
            $commentModel = new CommentModel();
            
            $data = [
                'comment' => $this->request->getVar("comment"),
                'reply_id' => $this->request->getVar("reply_id"),
            ];
            try {
                $commentModel->save($data);
                return $this->response->setJSON(['status'=>'OK']);
            } catch(\Exception $e){
                return $this->response->setJSON(['status'=>$e]);
            }
        }else {
            return $this->response->setJSON(['status'=>'post method does not exist']);
            // return view("welcome_message");
        }
    }

    public function practice(){
        $commentModel = new CommentModel();
        try {
            $data = $commentModel->orderBy('id', 'DESC')->where('reply_id',0)->findAll();
            $newData = array();
            foreach($data as $item){
                $time = Time::parse($item['created_at'], 'Asia/Kolkata', 'en_US');
                $timez = $time->humanize();
                array_push($newData, ["id"=>$item['id'], "comment"=>$item['comment'], "reply_id"=>$item['reply_id'],"created_at"=>$timez]);
            }
        } catch(\Exception $e){
            return $this->response->setJSON(['status'=>$e]);
        }

    }
}
