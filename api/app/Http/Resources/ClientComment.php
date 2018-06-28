<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User as UserResource;

class ClientComment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
		$user = new UserResource($this->user);
		$user = $user->toArray($request);
        return [
			"id" => $this->id,
			"text" => $this->text,
			"dateCreated" => $this->date_created,
			"userId" => $this->user_id,
			"clientId" => $this->client_id,
			"employeeId" => $this->user_id,
			"firstname" => $user["firstname"],
			"lastname" => $user["lastname"],
        ];
    }
}
