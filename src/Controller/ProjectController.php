<?php
  
namespace App\Controller;

use App\Entity\Food;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
  
/**
 * @Route("/api", name="api_")
 */
class ProjectController extends AbstractController
{
    /**
     * @Route("/project", name="project_index", methods={"GET"})
     */
    public function index(): Response
    {
        $products = $this->getDoctrine()
            ->getRepository(Food::class)
            ->findAll();
  
        $data = [];
  
        foreach ($products as $product) {
           $data[] = [
               'id' => $product->getId(),
               'name' => $product->getName(),
               'category' => $product->getCategory(),
               'price' => $product->getPrice(),
               'ingredients' => $product->getIngredients(),
               'cover' => $product->getCover(),



           ];
        }
  
  
        return $this->json($data);
    }
  
    /**
     * @Route("/project", name="project_new", methods={"POST"})
     */
    public function new(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $project = new Food();
        $project->setName($request->request->get('name'));
        $project->setCategory($request->request->get('category'));
        $project->setPrice($request->request->get('price'));
        $project->setIngredients($request->request->get('ingredients'));
        $project->setCover($request->request->get('cover'));



  
        $entityManager->persist($project);
        $entityManager->flush();
  
        return $this->json('Created new project successfully with id ' . $project->getId());
    }
  
    /**
     * @Route("/project/{id}", name="project_show", methods={"GET"})
     */
    public function show(int $id): Response
    {
        $project = $this->getDoctrine()
            ->getRepository(Food::class)
            ->find($id);
  
        if (!$project) {
  
            return $this->json('No project found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'category' => $project->getCategory(),
            'price' => $project->getPrice(),
            'ingredients' => $project->getIngredients(),
            'cover' => $project->getCover(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/project/{id}", name="project_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $project = $entityManager->getRepository(Food::class)->find($id);
  
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
         
        $content = json_decode($request->getContent());
        $project->setName($content->name);
        $project->setCategory($content->category);
        $project->setPrice($content->price);
        $project->setIngredients($content->ingredients);
        $project->setCover($content->cover);
    
        $entityManager->flush();
  
        $data =  [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'category' => $project->getCategory(),
            'price' => $project->getPrice(),
            'ingredients' => $project->getIngredients(),
            'cover' => $project->getCover(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/project/{id}", name="project_delete", methods={"DELETE"})
     */
    public function delete(int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $project = $entityManager->getRepository(Food::class)->find($id);
  
        if (!$project) {
            return $this->json('No project found for id' . $id, 404);
        }
  
        $entityManager->remove($project);
        $entityManager->flush();
  
        return $this->json('Deleted a project successfully with id ' . $id);
    }
  
  
}