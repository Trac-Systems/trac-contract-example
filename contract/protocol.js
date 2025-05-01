import {Protocol} from "trac-peer";

class SampleProtocol extends Protocol{

    /**
     * Extending from Protocol inherits its capabilities and allows you to define your own protocol.
     * The protocol supports the corresponding contract. Both files come in pairs.
     *
     * Instances of this class do NOT run in contract context. The constructor is only called once on Protocol
     * instantiation.
     *
     * this.peer: an instance of the entire Peer class, the actual node that runs the contract and everything else.
     * this.base: the database engine, provides await this.base.view.get('key') to get unsigned data (not finalized data).
     * this.options: the option stack passed from Peer instance.
     *
     * @param peer
     * @param base
     * @param options
     */
    constructor(peer, base, options = {}) {
        // calling super and passing all parameters is required.
        super(peer, base, options);
    }

    /**
     * The Protocol superclass ProtocolApi instance already provides numerous api functions.
     * You can extend the built-in api based on your protocol requirements.
     *
     * @returns {Promise<void>}
     */
    async extendApi(){
        this.api.getSampleData = function(){
            return 'Some sample data';
        }
    }

    /**
     * In order for a transaction to successfully trigger,
     * you need to create a mapping for the incoming tx command,
     * pointing at the contract function to execute.
     *
     * You can perform basic sanitization here, but do not use it to protect contract execution.
     * Instead, use the built-in schema support for in-contract sanitization instead
     * (Contract.addSchema() in contract constructor).
     *
     * @param command
     * @returns {{type: string, value: *}|null}
     */
    mapTxCommand(command){
        // prepare the payload
        let obj = { type : '', value : null };
        /*
        Triggering contract function in terminal will look like this:

        /tx --command 'something'

        You can also simulate a tx prior broadcast

        /tx --command 'something' --sim 1

        To programmatically execute a transaction from "outside",
        the api function "this.api.tx()" needs to be exposed by adding
        "api_tx_exposed : true" to the Peer instance options.
        Once exposed, it can be used directly through peer.protocol_instance.api.tx()

        Please study the superclass of this Protocol and Protocol.api to learn more.
        */
        if(command === 'something'){
            // type points at the "storeSomething" function in the contract.
            obj.type = 'storeSomething';
            // value can be null as there is no other payload, but the property must exist.
            obj.value = null;
            // return the payload to be used in your contract
            return obj;
        } else {
            /*
            now we assume our protocol allows to submit a json string with information
            what to do (the op) then we pass the parsed object to the value.
            the accepted json string can be executed as tx like this:

            /tx --command '{ "op" : "do_something", "some_key" : "some_data" }'

            Of course we can simulate this, as well:

            /tx --command '{ "op" : "do_something", "some_key" : "some_data" }' --sim 1
            */
            const json = this.safeJsonParse(command);
            if(json.op !== undefined && json.op === 'do_something'){
                obj.type = 'submitSomething';
                obj.value = json;
                return obj;
            }
        }
        // return null if no case matches.
        // if you do not return null, your protocol might behave unexpected.
        return null;
    }

    /**
     * Prints additional options for your protocol underneath the system ones in terminal.
     *
     * @returns {Promise<void>}
     */
    async printOptions(){
        console.log(' ');
        console.log('- Sample Commands:');
        console.log("- /print | use this flag to print some text to the terminal: '--text \"I am printing\"");
        // further protocol specific options go here
    }

    /**
     * Extend the terminal system commands and execute your custom ones for your protocol.
     * This is not transaction execution itself (though can be used for it based on your requirements).
     * For transactions, use the built-in /tx command in combination with command mapping (see above)
     *
     * @param input
     * @returns {Promise<void>}
     */
    async customCommand(input) {
        await super.tokenizeInput(input);
        if (this.input.startsWith("/print")) {
            const splitted = this.parseArgs(input);
            console.log(splitted.text);
        }
    }
}

export default SampleProtocol;