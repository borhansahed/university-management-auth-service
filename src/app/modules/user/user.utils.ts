import { User } from './user.model'

const findLastUserId = async () => {
  const lastId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastId?.id
}

export const generateUserId = async (): Promise<string> => {
  const createUserId =
    (await findLastUserId()) || (0).toString().padStart(5, '0')

  const incrementId = (parseInt(createUserId) + 1).toString().padStart(5, '0')

  return incrementId
}
