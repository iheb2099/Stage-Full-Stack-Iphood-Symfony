<?php
  
namespace App\Controller;

use App\Entity\Orders;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
  
/**
 * @Route("/api", name="api_")
 */
class OrderController extends AbstractController
{
    /**
     * @Route("/order", name="order_index", methods={"GET"})
     */
    public function index(): Response
    {
        $orders = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->findAll();
  
        $data = [];
  
        foreach ($orders as $order) {
           $data[] = [
               'id' => $order->getId(),
               'total' => $order->getTotal(),
               'time' => $order->getTime(),
               'date'=>$order->getDate(),
               'cart'=>$order->getCart()
           ];
        }
  
  
        return $this->json($data);
    }
  
    /**
     * @Route("/order", name="order_new", methods={"POST"})
     */
    public function new(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
  
        $project = new Orders();
        $project->setTotal($request->request->get('total')); 
        $project->setTime(new \DateTime()) ;  
        $project->setDate(new \DateTime()) ;  
        $project->setCart($request->request->get('cart')); 

        $entityManager->persist($project);
        $entityManager->flush();
  
        return $this->json('Created new project successfully with id ' . $project->getId());
    }
  
    /**
     * @Route("/order/{id}", name="order_show", methods={"GET"})
     */
    public function show(int $id): Response
    {
        $project = $this->getDoctrine()
            ->getRepository(Orders::class)
            ->find($id);
  
        if (!$project) {
  
            return $this->json('No project found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $project->getId(),
            'total' => $project->getTotal(),
            'time' => $project->getTime(),
            'date' => $project->getDate(),
            'cart'=>$project->getCart()
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/order/{id}", name="order_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $project = $entityManager->getRepository(Orders::class)->find($id);
  
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
         
        $content = json_decode($request->getContent());
         
        $project->setName($content->name);
        $project->setDescription($content->description);
        $entityManager->flush();
  
        $data =  [
            'id' => $project->getId(),
            'total' => $project->getTotal(),
            'time' => $project->getTime(),
            'date' => $project->getDate(),
            'cart'=>$project->getCart()
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/order/{id}", name="order_delete", methods={"DELETE"})
     */
    public function delete(int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $project = $entityManager->getRepository(Orders::class)->find($id);
  
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
  
        $entityManager->remove($project);
        $entityManager->flush();
  
        return $this->json('Deleted a project successfully with id ' . $id);
    }
  
  
}