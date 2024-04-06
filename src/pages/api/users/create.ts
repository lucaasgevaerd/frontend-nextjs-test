/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser, IUserCreate } from '@/types/user.d';

let users: IUser[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Método não permitido' });
	}

	const user = req.body as Partial<IUserCreate>;
	if (!('name' in user && 'email' in user && typeof user.name === 'string' && typeof user.email === 'string')) {
		return res.status(400).json({ message: 'Body inválido' });
	}

	const id = users.length + 1;
	const newUser: IUser = { id, name: user.name, email: user.email };

	users = [...users, newUser];

	return res.status(201).json(newUser);
};