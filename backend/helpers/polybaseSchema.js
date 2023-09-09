import { Polybase } from "@polybase/client";

export const createSchema = async () => {
  const db = new Polybase({
    defaultNamespace: "hackFS-testing13",
  });

  const createResponse = await db.applySchema(`
        @public
        collection timeBasedJob {
            id: string;
            name: string;
            contractAddress: string;
            ABI: string;
            functionName: string;
            scheduledBy: string;
            params: string[];
            scheduledTime: number;
            scheduledAt: number;
            isExecuted: boolean;

            @index(id, scheduledBy);

            constructor(id: string, name: string, contractAddress: string, ABI: string, functionName: string, scheduledBy: string,
            params: string[], scheduledTime: number, scheduledAt: number) {
                this.id = id;
                this.name = name;
                this.contractAddress = contractAddress;
                this.ABI = ABI;
                this.functionName = functionName;
                this.scheduledBy = scheduledBy;
                this.params = params;
                this.scheduledTime = scheduledTime;
                this.scheduledAt = scheduledAt;
                this.isExecuted = false;
            }

            markAsExecuted() {
                this.isExecuted = true;
            }
        }

        @public
        collection customLogicJob {
            id: string;
            name: string;
            contractAddress: string;
            ABI: string;
            value: number;
            data: string;
            scheduledBy: string;
            scheduledTime: number;
            executionCount?: number;
            executionTimeline?: number[];

            @index(id, scheduledBy);

            constructor(id: string, name: string, contractAddress: string, ABI: string, scheduledBy: string, value: number, data: string, scheduledTime: number) {
                this.id = id;
                this.name = name;
                this.contractAddress = contractAddress;
                this.ABI = ABI;
                this.scheduledBy = scheduledBy;
                this.value = value;
                this.data = data;
                this.scheduledTime = scheduledTime;
                this.executionCount = 0;
                this.executionTimeline = [];
            }

            increaseExecutionCount(executionTime: number) {
                this.executionCount += 1;
                this.executionTimeline.push(executionTime);
            }
        }

        @public
        collection users {
            id: string; 
            timeBasedJobs: timeBasedJob[];
            customLogicJobs: customLogicJob[];

            @index(id);

            constructor(id: string) {
                this.id = id;
                this.timeBasedJobs = [];
                this.customLogicJobs = [];
            }

            addNewTimeBasedJob(newJob: timeBasedJob) {
                this.timeBasedJobs.push(newJob);
            }

            addNewCustomLogicJob(newJob: customLogicJob) {
                this.customLogicJobs.push(newJob);
            }
        }

    `);
  console.log("create", createResponse);
  return createResponse;
};
