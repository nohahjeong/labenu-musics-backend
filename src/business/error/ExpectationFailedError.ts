import { BaseError } from './BaseError'

export class ExpectationFailedError extends BaseError {
    constructor(
        message: string
    ) {
        super(417, message)
    }
}