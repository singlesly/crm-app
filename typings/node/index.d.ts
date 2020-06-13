declare namespace NodeJS {
    // drop-in hotfix for nest-emitter on Node 12, awaiting new version
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Events extends EventEmitter {}
}
